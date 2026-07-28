import { describe, expect, it } from "vitest";
import { fetchVolumeHistory } from "../src/history";
import type { HassEntity, HomeAssistant } from "../src/types";

function sample(value: number, time: string): HassEntity {
  return {
    entity_id: "sensor.total_water",
    state: String(value),
    last_changed: time,
    attributes: {}
  };
}

describe("volume history", () => {
  it("converts units and interpolates stored volume", async () => {
    const start = new Date("2026-07-21T12:00:00Z");
    const end = new Date("2026-07-28T12:00:00Z");
    const hass: HomeAssistant = {
      states: {
        "sensor.total_water": {
          entity_id: "sensor.total_water",
          state: "31.5",
          attributes: { unit_of_measurement: "kL" }
        }
      },
      async callApi<T>() {
        return [
          [
            sample(36.5, start.toISOString()),
            sample(31.5, end.toISOString())
          ]
        ] as T;
      }
    };

    const points = await fetchVolumeHistory(
      hass,
      "sensor.total_water",
      7,
      end
    );
    expect(points).toHaveLength(96);
    expect(points[0].volume).toBe(36_500);
    expect(points.at(-1)?.volume).toBe(31_500);
    expect(points[48].volume).toBeLessThan(34_000);
  });
});
