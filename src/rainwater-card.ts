import { mdiWater } from "@mdi/js";
import { LitElement, html, nothing, svg, type PropertyValues } from "lit";
import {
  getConfigForm,
  getStubConfig,
  normalizeConfig,
  validateConfig
} from "./config";
import {
  chartPositionPercent,
  chartTooltipPosition,
  nearestChartPointIndex
} from "./chart";
import { fetchVolumeHistory } from "./history";
import { cardStyles } from "./styles";
import type {
  HistoryPoint,
  HomeAssistant,
  RainwaterCardConfig
} from "./types";
import {
  entity,
  formatPercent,
  formatVolume,
  volumeInLitres
} from "./values";

const CHART_WIDTH = 480;
const CHART_HEIGHT = 126;
const HISTORY_REFRESH_MS = 10 * 60 * 1000;
type ChartPointer = ReturnType<typeof chartTooltipPosition>;

type Status = "healthy" | "low" | "critical" | "full" | "monitoring" | "unavailable";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function smoothPath(coordinates: Array<[number, number]>): string {
  if (coordinates.length === 0) return "";
  if (coordinates.length === 1) {
    return `M 0 ${coordinates[0][1]} L ${CHART_WIDTH} ${coordinates[0][1]}`;
  }

  return coordinates.slice(1).reduce((path, [x, y], index) => {
    const [previousX, previousY] = coordinates[index];
    const midpoint = (previousX + x) / 2;
    return `${path} C ${midpoint} ${previousY}, ${midpoint} ${y}, ${x} ${y}`;
  }, `M ${coordinates[0][0]} ${coordinates[0][1]}`);
}

function flatHistory(volume: number, days: number, now = Date.now()): HistoryPoint[] {
  return Array.from({ length: 12 }, (_, index) => ({
    timestamp: now - (11 - index) * (days * 24 * 60 * 60 * 1000) / 11,
    volume
  }));
}

function statusFor(volume: number | undefined, percent: number | undefined): Status {
  if (volume === undefined) return "unavailable";
  if (percent === undefined) return "monitoring";
  if (percent <= 10) return "critical";
  if (percent <= 25) return "low";
  if (percent >= 98) return "full";
  return "healthy";
}

function statusLabel(status: Status): string {
  switch (status) {
    case "critical":
      return "Critical";
    case "low":
      return "Low";
    case "full":
      return "Full";
    case "monitoring":
      return "Monitoring";
    case "unavailable":
      return "Unavailable";
    default:
      return "Healthy";
  }
}

export class RainwaterCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _history: { state: true },
    _historyLoading: { state: true },
    _historyFailed: { state: true },
    _activeChartIndex: { state: true },
    _chartPointer: { state: true }
  };

  static styles = cardStyles;

  hass?: HomeAssistant;
  private _config?: RainwaterCardConfig;
  private _history: HistoryPoint[] = [];
  private _historyLoading = false;
  private _historyFailed = false;
  private _activeChartIndex?: number;
  private _chartPointer?: ChartPointer;
  private _lastHistoryKey = "";
  private _lastHistoryFetch = 0;

  static getConfigForm() {
    return getConfigForm();
  }

  static getStubConfig(hass?: HomeAssistant) {
    return getStubConfig(hass);
  }

  setConfig(config: RainwaterCardConfig): void {
    validateConfig(config);
    this._config = normalizeConfig({ ...config });
  }

  getCardSize(): number {
    return this._config?.show_history === false ? 6 : 9;
  }

  getGridOptions() {
    return {
      columns: 12,
      min_columns: 3
    };
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("hass") || changedProperties.has("_config")) {
      queueMicrotask(() => void this._loadHistoryIfNeeded());
    }
  }

  private async _loadHistoryIfNeeded(): Promise<void> {
    const config = this._config;
    const hass = this.hass;
    if (!config || !hass || config.show_history === false) return;

    const days = clamp(config.history_days ?? 7, 1, 30);
    const key = `${config.entity}|${days}`;
    const now = Date.now();
    if (
      this._historyLoading ||
      (key === this._lastHistoryKey && now - this._lastHistoryFetch < HISTORY_REFRESH_MS)
    ) {
      return;
    }

    this._historyLoading = true;
    this._historyFailed = false;
    this._lastHistoryKey = key;
    this._lastHistoryFetch = now;

    try {
      this._history = await fetchVolumeHistory(hass, config.entity, days);
    } catch {
      this._history = [];
      this._historyFailed = true;
    } finally {
      this._historyLoading = false;
    }
  }

  private _openMoreInfo(): void {
    if (!this._config) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        detail: { entityId: this._config.entity },
        bubbles: true,
        composed: true
      })
    );
  }

  private _inspectChart(event: PointerEvent, pointCount: number): void {
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this._chartPointer = chartTooltipPosition(
      event.clientX - bounds.left,
      event.clientY - bounds.top,
      bounds.width,
      bounds.height
    );
    const index = nearestChartPointIndex(
      event.clientX,
      bounds.left,
      bounds.width,
      pointCount
    );
    if (index !== this._activeChartIndex) this._activeChartIndex = index;
  }

  private _leaveChart(event: PointerEvent): void {
    if (event.pointerType === "mouse") this._clearChartInspection();
  }

  private _clearChartInspection(): void {
    this._activeChartIndex = undefined;
    this._chartPointer = undefined;
  }

  private _navigateChart(event: KeyboardEvent, pointCount: number): void {
    this._chartPointer = undefined;
    if (event.key === "Escape") {
      this._activeChartIndex = undefined;
      return;
    }
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

    event.preventDefault();
    const current = this._activeChartIndex ?? pointCount - 1;
    this._activeChartIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? pointCount - 1
          : clamp(current + (event.key === "ArrowLeft" ? -1 : 1), 0, pointCount - 1);
  }

  private _renderChart(points: HistoryPoint[], locale: string | undefined) {
    const values = points.map((point) => point.volume);
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    const padding = Math.max(100, (rawMax - rawMin) * 0.16);
    const minValue = Math.max(0, rawMin - padding);
    const maxValue = Math.max(minValue + 1, rawMax + padding);
    const range = maxValue - minValue;
    const coordinates: Array<[number, number]> = points.map((point, index) => [
      (index / Math.max(1, points.length - 1)) * CHART_WIDTH,
      4 + ((maxValue - point.volume) / range) * (CHART_HEIGHT - 8)
    ]);
    const linePath = smoothPath(coordinates);
    const areaPath = coordinates.length
      ? `${linePath} L ${CHART_WIDTH} ${CHART_HEIGHT} L 0 ${CHART_HEIGHT} Z`
      : "";
    const end = coordinates.at(-1) ?? [CHART_WIDTH, CHART_HEIGHT];
    const activeIndex =
      this._activeChartIndex === undefined
        ? undefined
        : clamp(this._activeChartIndex, 0, points.length - 1);
    const activePoint =
      activeIndex === undefined ? undefined : points[activeIndex];
    const activeCoordinate =
      activeIndex === undefined ? undefined : coordinates[activeIndex];
    const activePosition =
      activeIndex === undefined
        ? undefined
        : chartPositionPercent(activeIndex, points.length);
    const tooltipPlacement =
      this._chartPointer?.placement ??
      (activePosition !== undefined && activePosition > 64
        ? "place-left"
        : "place-right");
    const tooltipStyle = this._chartPointer
      ? `left: ${this._chartPointer.x}px; top: ${this._chartPointer.top}px`
      : `left: ${activePosition ?? 0}%`;
    const tooltipTime = activePoint
      ? new Intl.DateTimeFormat(locale, {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit"
        }).format(activePoint.timestamp)
      : "";

    return html`
      <div
        class="chart-wrap"
        role="group"
        tabindex="0"
        aria-label="Inspect stored rainwater volume history"
        @pointerdown=${(event: PointerEvent) => this._inspectChart(event, points.length)}
        @pointermove=${(event: PointerEvent) => this._inspectChart(event, points.length)}
        @pointerleave=${this._leaveChart}
        @pointercancel=${this._clearChartInspection}
        @keydown=${(event: KeyboardEvent) => this._navigateChart(event, points.length)}
        @blur=${this._clearChartInspection}
      >
        <svg
          viewBox="0 0 ${CHART_WIDTH} ${CHART_HEIGHT}"
          role="img"
          aria-label="Stored rainwater volume history"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="water-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--rainwater-blue)" stop-opacity="0.28"></stop>
              <stop offset="100%" stop-color="var(--rainwater-blue)" stop-opacity="0.02"></stop>
            </linearGradient>
          </defs>
          ${[0, 1, 2, 3].map((index) => {
            const y = (index / 3) * CHART_HEIGHT;
            return svg`<line class="grid-line" x1="0" y1=${y} x2=${CHART_WIDTH} y2=${y}></line>`;
          })}
          ${[0, 1, 2, 3, 4].map((index) => {
            const x = (index / 4) * CHART_WIDTH;
            return svg`<line class="grid-line" x1=${x} y1="0" x2=${x} y2=${CHART_HEIGHT}></line>`;
          })}
          <path class="area" d=${areaPath}></path>
          <path class="line" d=${linePath}></path>
          <circle class="end-dot" cx=${end[0]} cy=${end[1]} r="5"></circle>
          ${activeCoordinate
            ? svg`
                <line
                  class="inspection-line"
                  x1=${activeCoordinate[0]}
                  y1="0"
                  x2=${activeCoordinate[0]}
                  y2=${CHART_HEIGHT}
                ></line>
                <circle
                  class="inspection-dot"
                  cx=${activeCoordinate[0]}
                  cy=${activeCoordinate[1]}
                  r="5"
                ></circle>
              `
            : nothing}
        </svg>
        ${activePoint && activePosition !== undefined
          ? html`
              <div
                class="chart-tooltip ${tooltipPlacement}"
                style=${tooltipStyle}
                aria-live="polite"
              >
                <time>${tooltipTime}</time>
                <div class="tooltip-item">
                  <span><i></i>Stored water</span>
                  <strong>${formatVolume(activePoint.volume, locale)}</strong>
                </div>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  protected render() {
    const config = this._config;
    if (!config) return nothing;

    const locale = this.hass?.locale?.language ?? this.hass?.language;
    const current = volumeInLitres(entity(this.hass, config.entity));
    const capacity =
      config.capacity !== undefined && config.capacity > 0 ? config.capacity : undefined;
    const reserve = Math.max(0, Math.min(config.reserve ?? 0, capacity ?? Infinity));
    const percent =
      current !== undefined && capacity !== undefined
        ? clamp((current / capacity) * 100, 0, 100)
        : undefined;
    const fill = percent ?? 0;
    const status = statusFor(current, percent);
    const available =
      current !== undefined ? Math.max(0, current - reserve) : undefined;
    const headroom =
      current !== undefined && capacity !== undefined
        ? Math.max(0, capacity - current)
        : undefined;
    const days = clamp(config.history_days ?? 7, 1, 30);
    const chartPoints =
      this._history.length > 1
        ? this._history
        : flatHistory(current ?? 0, days);
    const dayCutoff = Date.now() - 24 * 60 * 60 * 1000;
    const dayStart =
      [...chartPoints].reverse().find((point) => point.timestamp <= dayCutoff) ??
      chartPoints[0];
    const dayChange =
      current !== undefined && this._history.length > 1 && dayStart
        ? current - dayStart.volume
        : undefined;
    const formatter = new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric"
    });
    const firstTime = chartPoints[0]?.timestamp;

    const footer =
      current === undefined
        ? "Stored water sensor is unavailable"
        : capacity === undefined
          ? "Add total capacity to enable fill level and headroom"
          : current <= reserve
            ? "Protected reserve is currently in use"
            : dayChange !== undefined && dayChange > 10
              ? `Storage increased by ${formatVolume(dayChange, locale)} in 24 hours`
              : dayChange !== undefined && dayChange < -10
                ? `${formatVolume(Math.abs(dayChange), locale)} used in the past 24 hours`
                : "Stored rainwater level is steady";

    return html`
      <ha-card>
        <div class="card">
          <header class="header">
            <div class="title-group">
              <div class="icon-tile" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d=${mdiWater}></path></svg>
              </div>
              <div>
                <h1>${config.title || "Rainwater"}</h1>
                <p class="subtitle">Total stored volume</p>
              </div>
            </div>
            <div class="status ${status}">
              <span class="dot"></span>
              ${statusLabel(status)}
            </div>
          </header>

          <section class="hero">
            <button
              class="tank-button"
              type="button"
              aria-label="Open stored water entity details"
              @click=${this._openMoreInfo}
            >
              <div
                class="tank ${capacity === undefined ? "no-capacity" : ""}"
                style="--fill: ${fill}%"
              >
                <div class="tank-water"></div>
                <div class="tank-shine"></div>
                <div class="tank-label">
                  ${capacity === undefined ? "Set capacity" : formatPercent(percent, locale)}
                </div>
              </div>
            </button>

            <div class="summary">
              <p class="volume">${formatVolume(current, locale)}</p>
              <p class="volume-note">
                ${capacity === undefined
                  ? "Combined rainwater storage"
                  : `${formatPercent(percent, locale)} of ${formatVolume(capacity, locale)}`}
              </p>
              <div class="meter" style="--fill: ${fill}%"><span></span></div>
              <div class="stats">
                <div class="stat">
                  <span>Available</span>
                  <strong>${formatVolume(available, locale)}</strong>
                </div>
                <div class="stat">
                  <span>24-hour change</span>
                  <strong>${formatVolume(dayChange, locale, { signed: true })}</strong>
                </div>
                <div class="stat">
                  <span>Protected reserve</span>
                  <strong>${formatVolume(reserve, locale)}</strong>
                </div>
                <div class="stat">
                  <span>Headroom</span>
                  <strong>${formatVolume(headroom, locale)}</strong>
                </div>
              </div>
            </div>
          </section>

          ${config.show_history === false
            ? nothing
            : html`
                <section class="history">
                  <div class="section-heading">
                    <h2>Stored water · ${days} ${days === 1 ? "day" : "days"}</h2>
                    <span>${formatVolume(current, locale)}</span>
                  </div>
                  ${this._renderChart(chartPoints, locale)}
                  <div class="chart-axis">
                    <span>${firstTime ? formatter.format(firstTime) : ""}</span>
                    <span>Now</span>
                  </div>
                  ${this._historyLoading
                    ? html`<p class="history-note">Loading Home Assistant history…</p>`
                    : this._historyFailed
                      ? html`<p class="history-note">History unavailable · showing current level</p>`
                      : nothing}
                </section>
              `}

          <footer class="footer">
            <span class="dot" aria-hidden="true"></span>
            <span>${footer}</span>
          </footer>
        </div>
      </ha-card>
    `;
  }
}

if (!customElements.get("rainwater-card")) {
  customElements.define("rainwater-card", RainwaterCard);
}

window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === "rainwater-card")) {
  window.customCards.push({
    type: "rainwater-card",
    name: "Rainwater Card",
    preview: true,
    description: "A single-reservoir rainwater volume, reserve and history card."
  });
}
