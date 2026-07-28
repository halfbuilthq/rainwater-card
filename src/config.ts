import type { HomeAssistant, RainwaterCardConfig } from "./types";

export const DEFAULT_CONFIG: Partial<RainwaterCardConfig> = {
  title: "Rainwater",
  history_days: 7,
  show_history: true
};

const FIELD_LABELS: Record<string, string> = {
  title: "Title",
  entity: "Total stored water",
  capacity: "Total storage capacity",
  reserve: "Protected reserve",
  history_days: "History period",
  show_history: "Show volume history"
};

const FIELD_HELPERS: Record<string, string> = {
  entity: "A single sensor containing the combined stored volume.",
  capacity: "Optional. Enables percentage, fill level and remaining headroom.",
  reserve: "Optional. Water below this volume is treated as protected reserve.",
  history_days: "Number of days displayed in the volume trend."
};

export function getConfigForm() {
  return {
    schema: [
      { name: "title", selector: { text: {} } },
      {
        name: "entity",
        required: true,
        selector: { entity: { domain: "sensor" } }
      },
      {
        type: "grid",
        name: "",
        flatten: true,
        column_min_width: "220px",
        schema: [
          {
            name: "capacity",
            selector: {
              number: {
                min: 1,
                max: 10_000_000,
                step: 100,
                unit_of_measurement: "L",
                mode: "box"
              }
            }
          },
          {
            name: "reserve",
            selector: {
              number: {
                min: 0,
                max: 10_000_000,
                step: 100,
                unit_of_measurement: "L",
                mode: "box"
              }
            }
          }
        ]
      },
      {
        type: "grid",
        name: "",
        flatten: true,
        column_min_width: "220px",
        schema: [
          {
            name: "history_days",
            selector: {
              number: {
                min: 1,
                max: 30,
                step: 1,
                unit_of_measurement: "days",
                mode: "box"
              }
            }
          },
          { name: "show_history", selector: { boolean: {} } }
        ]
      }
    ],
    computeLabel: (schema: { name?: string }) =>
      schema.name ? FIELD_LABELS[schema.name] : undefined,
    computeHelper: (schema: { name?: string }) =>
      schema.name ? FIELD_HELPERS[schema.name] : undefined,
    assertConfig: (config: RainwaterCardConfig) => validateConfig(config)
  };
}

export function validateConfig(config: RainwaterCardConfig): void {
  if (!config.entity || typeof config.entity !== "string") {
    throw new Error("Total stored water is required.");
  }
  if (config.capacity !== undefined && config.capacity <= 0) {
    throw new Error("Total storage capacity must be greater than zero.");
  }
  if (config.reserve !== undefined && config.reserve < 0) {
    throw new Error("Protected reserve cannot be negative.");
  }
}

export function normalizeConfig(config: RainwaterCardConfig): RainwaterCardConfig {
  return {
    ...DEFAULT_CONFIG,
    ...config,
    type: config.type || "custom:rainwater-card"
  } as RainwaterCardConfig;
}

export function getStubConfig(hass?: HomeAssistant): RainwaterCardConfig {
  const candidates = Object.values(hass?.states ?? {});
  const match = candidates.find((state) => {
    const haystack = `${state.entity_id} ${state.attributes.friendly_name ?? ""}`.toLowerCase();
    return (
      haystack.includes("total water volume") ||
      haystack.includes("total_water_volume") ||
      haystack.includes("rainwater total")
    );
  });

  return normalizeConfig({
    type: "custom:rainwater-card",
    entity: match?.entity_id ?? ""
  });
}
