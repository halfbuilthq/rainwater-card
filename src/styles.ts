import { css } from "lit";

export const cardStyles = css`
  :host {
    --rainwater-blue: #1689c8;
    --rainwater-deep: #075c8f;
    --rainwater-aqua: #45c6d9;
    --rainwater-soft: color-mix(in srgb, var(--rainwater-blue) 12%, transparent);
    display: block;
    container-type: inline-size;
  }

  * {
    box-sizing: border-box;
  }

  ha-card {
    overflow: hidden;
    color: var(--primary-text-color, #17212b);
    background:
      radial-gradient(circle at 92% 2%, var(--rainwater-soft), transparent 38%),
      var(--ha-card-background, var(--card-background-color, #fff));
  }

  .card {
    padding: clamp(18px, 5cqw, 28px);
  }

  .header,
  .title-group,
  .status,
  .section-heading,
  .legend,
  .footer {
    display: flex;
    align-items: center;
  }

  .header {
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 22px;
  }

  .title-group {
    min-width: 0;
    gap: 13px;
  }

  .icon-tile {
    display: grid;
    width: 46px;
    height: 46px;
    flex: 0 0 auto;
    place-items: center;
    border-radius: 15px;
    color: var(--rainwater-blue);
    background: var(--rainwater-soft);
  }

  .icon-tile svg {
    width: 25px;
    height: 25px;
    fill: currentColor;
  }

  h1,
  h2,
  p {
    margin: 0;
  }

  h1 {
    overflow: hidden;
    color: var(--primary-text-color, #17212b);
    font-size: clamp(20px, 5.5cqw, 28px);
    font-weight: 760;
    letter-spacing: -0.8px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .subtitle {
    margin-top: 3px;
    color: var(--secondary-text-color, #657181);
    font-size: 13px;
  }

  .status {
    flex: 0 0 auto;
    gap: 8px;
    min-height: 34px;
    padding: 0 13px;
    border-radius: 999px;
    color: var(--rainwater-deep);
    background: var(--rainwater-soft);
    font-size: 12px;
    font-weight: 750;
  }

  .status.low {
    color: #8a5a00;
    background: color-mix(in srgb, var(--warning-color, #f4a100) 16%, transparent);
  }

  .status.critical,
  .status.unavailable {
    color: var(--error-color, #c62828);
    background: color-mix(in srgb, var(--error-color, #c62828) 13%, transparent);
  }

  .status .dot,
  .footer .dot {
    width: 8px;
    height: 8px;
    flex: 0 0 auto;
    border-radius: 50%;
    background: currentColor;
  }

  .hero {
    display: grid;
    grid-template-columns: minmax(150px, 0.8fr) minmax(210px, 1.2fr);
    gap: clamp(20px, 6cqw, 34px);
    align-items: center;
    padding: clamp(18px, 4.5cqw, 25px);
    border: 1px solid color-mix(in srgb, var(--rainwater-blue) 24%, var(--divider-color, #ddd));
    border-radius: 22px;
    background: color-mix(
      in srgb,
      var(--ha-card-background, var(--card-background-color, #fff)) 88%,
      var(--rainwater-blue) 12%
    );
  }

  .tank-button {
    display: grid;
    width: 100%;
    padding: 0;
    border: 0;
    place-items: center;
    color: inherit;
    background: transparent;
    cursor: pointer;
  }

  .tank {
    position: relative;
    width: min(100%, 168px);
    aspect-ratio: 0.76;
    overflow: hidden;
    border: 4px solid color-mix(in srgb, var(--primary-text-color, #17212b) 76%, transparent);
    border-radius: 42% 42% 18px 18px / 16% 16% 18px 18px;
    background:
      linear-gradient(
        90deg,
        color-mix(in srgb, var(--primary-text-color, #17212b) 4%, transparent),
        transparent 30% 70%,
        color-mix(in srgb, var(--primary-text-color, #17212b) 5%, transparent)
      ),
      color-mix(in srgb, var(--card-background-color, #fff) 72%, transparent);
    box-shadow:
      inset 0 0 0 1px color-mix(in srgb, white 55%, transparent),
      0 18px 34px color-mix(in srgb, var(--rainwater-deep) 15%, transparent);
  }

  .tank::before {
    position: absolute;
    z-index: 3;
    top: 11px;
    right: 21%;
    left: 21%;
    height: 8px;
    border-radius: 999px;
    background: color-mix(in srgb, white 48%, transparent);
    content: "";
  }

  .tank-water {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: max(0%, min(100%, var(--fill, 0%)));
    background:
      linear-gradient(180deg, var(--rainwater-aqua), var(--rainwater-blue) 52%, var(--rainwater-deep));
    transition: height 700ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .tank-water::before,
  .tank-water::after {
    position: absolute;
    top: -9px;
    width: 65%;
    height: 19px;
    border-radius: 50%;
    content: "";
  }

  .tank-water::before {
    left: -7%;
    background: color-mix(in srgb, var(--rainwater-aqua) 82%, white);
    transform: rotate(3deg);
  }

  .tank-water::after {
    right: -8%;
    background: var(--rainwater-aqua);
    transform: rotate(-4deg);
  }

  .tank-shine {
    position: absolute;
    z-index: 2;
    top: 18%;
    bottom: 14%;
    left: 15%;
    width: 9%;
    border-radius: 999px;
    background: linear-gradient(180deg, color-mix(in srgb, white 70%, transparent), transparent);
    opacity: 0.75;
  }

  .tank-label {
    position: absolute;
    z-index: 4;
    top: 50%;
    left: 50%;
    display: grid;
    width: 76px;
    height: 76px;
    border: 1px solid color-mix(in srgb, white 60%, transparent);
    place-items: center;
    border-radius: 50%;
    color: white;
    background: color-mix(in srgb, var(--rainwater-deep) 74%, transparent);
    box-shadow: 0 8px 22px color-mix(in srgb, black 18%, transparent);
    font-size: 18px;
    font-weight: 780;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(8px);
  }

  .tank.no-capacity .tank-label {
    font-size: 12px;
    letter-spacing: 0.2px;
  }

  .volume {
    color: var(--primary-text-color, #17212b);
    font-size: clamp(38px, 11cqw, 60px);
    font-weight: 790;
    letter-spacing: -2.6px;
    line-height: 0.95;
  }

  .volume-note {
    margin-top: 8px;
    color: var(--rainwater-deep);
    font-size: 14px;
    font-weight: 720;
  }

  .meter {
    height: 8px;
    margin: 18px 0 20px;
    overflow: hidden;
    border-radius: 999px;
    background: color-mix(in srgb, var(--secondary-text-color, #657181) 16%, transparent);
  }

  .meter > span {
    display: block;
    width: var(--fill, 0%);
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, var(--rainwater-deep), var(--rainwater-aqua));
    transition: width 700ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    overflow: hidden;
    border: 1px solid var(--divider-color, #e3e7eb);
    border-radius: 14px;
    background: var(--divider-color, #e3e7eb);
  }

  .stat {
    min-width: 0;
    padding: 13px 14px;
    background: var(--ha-card-background, var(--card-background-color, #fff));
  }

  .stat span {
    display: block;
    color: var(--secondary-text-color, #657181);
    font-size: 11px;
    font-weight: 650;
  }

  .stat strong {
    display: block;
    overflow: hidden;
    margin-top: 4px;
    color: var(--primary-text-color, #17212b);
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .history {
    margin-top: 22px;
    padding-top: 20px;
    border-top: 1px solid var(--divider-color, #e3e7eb);
  }

  .section-heading {
    justify-content: space-between;
    gap: 16px;
  }

  .section-heading h2 {
    color: var(--primary-text-color, #17212b);
    font-size: 14px;
    font-weight: 760;
  }

  .section-heading span {
    color: var(--secondary-text-color, #657181);
    font-size: 12px;
  }

  .chart-wrap {
    height: 128px;
    margin-top: 12px;
  }

  .chart-wrap svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .grid-line {
    stroke: var(--divider-color, #e3e7eb);
    stroke-width: 1;
    vector-effect: non-scaling-stroke;
  }

  .area {
    fill: url("#water-area");
  }

  .line {
    fill: none;
    stroke: var(--rainwater-blue);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 3;
    vector-effect: non-scaling-stroke;
  }

  .end-dot {
    fill: var(--rainwater-aqua);
    stroke: var(--ha-card-background, var(--card-background-color, #fff));
    stroke-width: 2.5;
    vector-effect: non-scaling-stroke;
  }

  .chart-axis {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    color: var(--secondary-text-color, #657181);
    font-size: 11px;
  }

  .history-note {
    margin-top: 10px;
    color: var(--secondary-text-color, #657181);
    font-size: 11px;
  }

  .footer {
    gap: 10px;
    margin-top: 20px;
    padding-top: 18px;
    border-top: 1px solid var(--divider-color, #e3e7eb);
    color: var(--secondary-text-color, #657181);
    font-size: 12px;
  }

  .footer .dot {
    color: var(--rainwater-aqua);
  }

  @container (max-width: 430px) {
    .header {
      align-items: flex-start;
    }

    .status {
      min-height: 30px;
      padding: 0 10px;
      font-size: 11px;
    }

    .hero {
      grid-template-columns: 112px minmax(0, 1fr);
      gap: 16px;
      padding: 16px;
    }

    .tank {
      width: 108px;
      border-width: 3px;
    }

    .tank-label {
      width: 58px;
      height: 58px;
      font-size: 15px;
    }

    .volume {
      font-size: clamp(32px, 10cqw, 44px);
      letter-spacing: -1.8px;
    }

    .stat {
      padding: 11px 10px;
    }

    .stat strong {
      font-size: 13px;
    }
  }

  @container (max-width: 330px) {
    .hero {
      grid-template-columns: 1fr;
    }

    .tank {
      width: 126px;
    }
  }
`;
