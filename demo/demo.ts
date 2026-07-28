import "../src/rainwater-card";
import type { RainwaterCard } from "../src/rainwater-card";
import type { HassEntity, HomeAssistant } from "../src/types";
import "./styles.css";

function volumeSensor(value: number, time = new Date()): HassEntity {
  return {
    entity_id: "sensor.watertankhub_total_water_volume_l",
    state: String(value),
    last_changed: time.toISOString(),
    attributes: {
      friendly_name: "Total water volume",
      unit_of_measurement: "L",
      device_class: "volume"
    }
  };
}

const currentVolume = 31_420;
const states: Record<string, HassEntity> = {
  "sensor.watertankhub_total_water_volume_l": volumeSensor(currentVolume)
};

const hass: HomeAssistant = {
  states,
  locale: {
    language: "en-AU",
    number_format: "language",
    time_format: "12"
  },
  async callApi<T>() {
    const now = Date.now();
    const volumes = [
      36_800, 36_400, 36_050, 35_600, 35_200, 34_780, 34_300, 33_920,
      33_400, 32_950, 32_500, 32_150, 31_720, 31_280, 30_900, 30_450,
      30_020, 29_680, 29_250, 28_900, 28_550, 29_700, 33_800, 36_200,
      35_850, 35_450, 35_050, 34_650, 34_200, 33_800, 33_300, 32_900,
      32_500, 32_050, 31_700, 31_420
    ];
    const response = [
      volumes.map((value, index) =>
        volumeSensor(
          value,
          new Date(now - (volumes.length - 1 - index) * (7 * 24 * 60 * 60 * 1000) / 35)
        )
      )
    ];
    return response as T;
  }
};

const card = document.querySelector("rainwater-card") as RainwaterCard;
card.setConfig({
  type: "custom:rainwater-card",
  title: "Rainwater",
  entity: "sensor.watertankhub_total_water_volume_l",
  capacity: 48_000,
  reserve: 5_000,
  history_days: 7,
  show_history: true
});
card.hass = hass;
