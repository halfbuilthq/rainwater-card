import type { HassEntity, HomeAssistant } from "./types";

const LITRES_PER_US_GALLON = 3.785411784;
const LITRES_PER_IMPERIAL_GALLON = 4.54609;

export function entity(
  hass: HomeAssistant | undefined,
  entityId: string | undefined
): HassEntity | undefined {
  return entityId ? hass?.states[entityId] : undefined;
}

export function numericState(state: HassEntity | undefined): number | undefined {
  if (!state || ["unknown", "unavailable", "none", ""].includes(state.state.toLowerCase())) {
    return undefined;
  }
  const value = Number(state.state);
  return Number.isFinite(value) ? value : undefined;
}

export function volumeInLitres(state: HassEntity | undefined): number | undefined {
  const value = numericState(state);
  if (value === undefined) return undefined;

  const unit = (state?.attributes.unit_of_measurement ?? "L")
    .trim()
    .toLowerCase()
    .replace("³", "3");

  switch (unit) {
    case "kl":
      return value * 1_000;
    case "m3":
      return value * 1_000;
    case "gal":
    case "us gal":
      return value * LITRES_PER_US_GALLON;
    case "imp gal":
      return value * LITRES_PER_IMPERIAL_GALLON;
    default:
      return value;
  }
}

export function formatVolume(
  litres: number | undefined,
  locale?: string,
  options: { signed?: boolean; compact?: boolean } = {}
): string {
  if (litres === undefined || !Number.isFinite(litres)) return "—";

  const absolute = Math.abs(litres);
  const useKilolitres = options.compact !== false && absolute >= 1_000;
  const value = useKilolitres ? litres / 1_000 : litres;
  const maximumFractionDigits = useKilolitres ? (absolute >= 10_000 ? 1 : 2) : 0;
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits,
    minimumFractionDigits: useKilolitres && absolute < 10_000 ? 1 : 0,
    signDisplay: options.signed ? "always" : "auto"
  }).format(value);

  return `${formatted} ${useKilolitres ? "kL" : "L"}`;
}

export function formatPercent(value: number | undefined, locale?: string): string {
  if (value === undefined || !Number.isFinite(value)) return "—";
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(value)}%`;
}
