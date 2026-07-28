# Rainwater Card for Home Assistant

A single-reservoir dashboard card for total stored rainwater, usable reserve,
remaining capacity, daily change, and volume history.

## Features

- One required total-volume entity
- Capacity-derived fill percentage and visual tank level
- Configurable protected reserve
- Available water and remaining headroom
- 24-hour volume change
- Home Assistant history over 1–30 days
- Native Home Assistant visual configuration
- Responsive light and dark themes
- HACS-compatible packaging

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
