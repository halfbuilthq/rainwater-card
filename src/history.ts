import type { HassEntity, HistoryPoint, HomeAssistant } from "./types";
import { volumeInLitres } from "./values";

type HistoryResponse = HassEntity[][];

const BUCKET_COUNT = 96;

function normalizedVolume(
  state: HassEntity | undefined,
  reference: HassEntity | undefined
): number {
  if (!state) return 0;
  return Math.max(
    0,
    volumeInLitres({
      ...state,
      attributes: {
        ...reference?.attributes,
        ...state.attributes
      }
    }) ?? 0
  );
}

function valueAt(
  series: HassEntity[],
  timestamp: number,
  reference: HassEntity | undefined
): number {
  if (series.length === 0) return 0;

  let before = series[0];
  let after = series.at(-1) ?? series[0];

  for (const state of series) {
    const stateTime = Date.parse(state.last_changed ?? state.last_updated ?? "");
    if (!Number.isFinite(stateTime)) continue;
    if (stateTime <= timestamp) before = state;
    if (stateTime >= timestamp) {
      after = state;
      break;
    }
  }

  const beforeTime = Date.parse(before.last_changed ?? before.last_updated ?? "");
  const afterTime = Date.parse(after.last_changed ?? after.last_updated ?? "");
  const beforeValue = normalizedVolume(before, reference);
  const afterValue = normalizedVolume(after, reference);

  if (
    !Number.isFinite(beforeTime) ||
    !Number.isFinite(afterTime) ||
    beforeTime === afterTime
  ) {
    return beforeValue;
  }

  const progress = Math.min(
    1,
    Math.max(0, (timestamp - beforeTime) / (afterTime - beforeTime))
  );
  return beforeValue + (afterValue - beforeValue) * progress;
}

export async function fetchVolumeHistory(
  hass: HomeAssistant,
  entityId: string,
  days: number,
  now = new Date()
): Promise<HistoryPoint[]> {
  const end = now;
  const safeDays = Math.min(30, Math.max(1, days));
  const start = new Date(end.getTime() - safeDays * 24 * 60 * 60 * 1000);
  const path =
    `history/period/${encodeURIComponent(start.toISOString())}` +
    `?end_time=${encodeURIComponent(end.toISOString())}` +
    `&filter_entity_id=${encodeURIComponent(entityId)}` +
    "&minimal_response&no_attributes&significant_changes_only=0";

  const response = await hass.callApi<HistoryResponse>("GET", path);
  const series =
    response.find((candidate) =>
      candidate.some((state) => state.entity_id === entityId)
    ) ?? [];

  return Array.from({ length: BUCKET_COUNT }, (_, index) => {
    const timestamp =
      start.getTime() +
      (index / (BUCKET_COUNT - 1)) * (end.getTime() - start.getTime());
    return {
      timestamp,
      volume: valueAt(series, timestamp, hass.states[entityId])
    };
  });
}
