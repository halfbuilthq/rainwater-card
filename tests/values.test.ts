import { describe, expect, it } from "vitest";
import type { HassEntity } from "../src/types";
import { formatVolume, numericState, volumeInLitres } from "../src/values";

function state(value: string, unit = "L"): HassEntity {
  return {
    entity_id: "sensor.water",
    state: value,
    attributes: { unit_of_measurement: unit }
  };
}

describe("water volume values", () => {
  it("converts supported units to litres", () => {
    expect(volumeInLitres(state("12.5", "kL"))).toBe(12_500);
    expect(volumeInLitres(state("3", "m³"))).toBe(3_000);
    expect(volumeInLitres(state("10", "L"))).toBe(10);
  });

  it("ignores unavailable and invalid states", () => {
    expect(numericState(state("unavailable"))).toBeUndefined();
    expect(volumeInLitres(state("not-a-number"))).toBeUndefined();
  });

  it("formats large values as kilolitres", () => {
    expect(formatVolume(31_420, "en-AU")).toBe("31.4 kL");
    expect(formatVolume(-1_250, "en-AU", { signed: true })).toBe("-1.25 kL");
  });
});
