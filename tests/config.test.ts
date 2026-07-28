import { describe, expect, it } from "vitest";
import {
  getConfigForm,
  getStubConfig,
  normalizeConfig,
  validateConfig
} from "../src/config";
import type { HomeAssistant, RainwaterCardConfig } from "../src/types";

describe("rainwater card config", () => {
  it("requires one total stored water entity", () => {
    expect(() =>
      validateConfig({ type: "custom:rainwater-card", entity: "" })
    ).toThrow("Total stored water is required");
  });

  it("applies defaults without adding entity fields", () => {
    const config = normalizeConfig({
      type: "custom:rainwater-card",
      entity: "sensor.total_water"
    });
    expect(config).toMatchObject({
      entity: "sensor.total_water",
      history_days: 7,
      show_history: true
    });
    expect(Object.keys(config).filter((key) => key.endsWith("_entity"))).toHaveLength(0);
  });

  it("finds a likely combined total sensor for the picker preview", () => {
    const hass = {
      states: {
        "sensor.watertankhub_total_water_volume_l": {
          entity_id: "sensor.watertankhub_total_water_volume_l",
          state: "31420",
          attributes: { friendly_name: "Total water volume" }
        }
      },
      async callApi<T>() {
        return [] as T;
      }
    } as HomeAssistant;
    expect(getStubConfig(hass).entity).toBe(
      "sensor.watertankhub_total_water_volume_l"
    );
  });

  it("exposes a native Home Assistant configuration schema", () => {
    const form = getConfigForm();
    const config = {
      type: "custom:rainwater-card",
      entity: "sensor.total_water"
    } as RainwaterCardConfig;
    expect(form.schema).toHaveLength(4);
    expect(() => form.assertConfig(config)).not.toThrow();
  });
});
