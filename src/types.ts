export interface HassEntity {
  entity_id: string;
  state: string;
  last_changed?: string;
  last_updated?: string;
  attributes: {
    friendly_name?: string;
    unit_of_measurement?: string;
    device_class?: string;
    [key: string]: unknown;
  };
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callApi<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    parameters?: unknown
  ): Promise<T>;
  locale?: {
    language?: string;
    number_format?: string;
    time_format?: string;
  };
  language?: string;
}

export interface RainwaterCardConfig {
  type: string;
  entity: string;
  title?: string;
  capacity?: number;
  reserve?: number;
  history_days?: number;
  show_history?: boolean;
}

export interface HistoryPoint {
  timestamp: number;
  volume: number;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      preview?: boolean;
      description?: string;
      documentationURL?: string;
    }>;
  }

  interface HTMLElementTagNameMap {
    "rainwater-card": HTMLElement;
  }
}
