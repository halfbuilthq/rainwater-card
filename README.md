# Rainwater Card for Home Assistant

[![HACS Default](https://img.shields.io/badge/HACS-Default-41BDF5.svg)](https://github.com/hacs/default)

A single-reservoir dashboard card for total stored rainwater, usable reserve,
remaining capacity, daily change, and volume history.

![Rainwater Card preview](docs/rainwater-card-preview.svg)

## Features

- One required total-volume entity
- Capacity-derived fill percentage and visual tank level
- Configurable protected reserve
- Available water and remaining headroom
- 24-hour volume change
- Home Assistant history over 1–30 days
- Mouse, touch and keyboard chart inspection with point-in-time tooltips
- Native Home Assistant visual configuration
- Responsive light and dark themes
- Available in the default HACS catalogue

## Configuration

```yaml
type: custom:rainwater-card
title: Rainwater
entity: sensor.watertankhub_total_water_volume_l
capacity: 48000
reserve: 5000
history_days: 7
show_history: true
```

Only `entity` is required. `capacity` and `reserve` are numeric values in
litres, not additional entities.

## HACS installation

The card is available in the default HACS catalogue; no custom repository is needed.

[![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=halfbuilthq&repository=rainwater-card&category=plugin)

1. Select the button above, or open **HACS** in Home Assistant.
2. Search for **Rainwater Card**.
3. Open the card and select **Download**.
4. Refresh your browser, then add **Rainwater Card** from the dashboard card picker.

For updates, download the latest release when offered in HACS and refresh your
dashboard. HACS may take time to discover a newly published release.

## Development

```sh
npm install
npm run dev
```

Run all tests and build the production bundle:

```sh
npm run check
```

The bundle is emitted to `dist/rainwater-card.js`.

## Manual installation

1. Copy `dist/rainwater-card.js` to `<config>/www/rainwater-card.js`.
2. Add `/local/rainwater-card.js` as a JavaScript module dashboard resource.
3. Add **Rainwater Card** from Home Assistant's card picker.

## Supported volume units

The total-volume sensor may report `L`, `kL`, `m³`, US gallons, or imperial
gallons. Values are normalized internally to litres.

## License

[MIT](LICENSE)
