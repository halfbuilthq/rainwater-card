import { describe, expect, it } from "vitest";
import {
  chartPositionPercent,
  chartTooltipPosition,
  nearestChartPointIndex
} from "../src/chart";

describe("rainwater chart inspection", () => {
  it("selects the nearest history point and clamps to the chart", () => {
    expect(nearestChartPointIndex(100, 100, 480, 12)).toBe(0);
    expect(nearestChartPointIndex(340, 100, 480, 12)).toBe(6);
    expect(nearestChartPointIndex(700, 100, 480, 12)).toBe(11);
  });

  it("positions the selected point as a percentage", () => {
    expect(chartPositionPercent(0, 12)).toBe(0);
    expect(chartPositionPercent(11, 12)).toBe(100);
    expect(chartPositionPercent(4, 1)).toBe(0);
  });

  it("keeps the tooltip beside the pointer and flips before the right edge", () => {
    expect(chartTooltipPosition(200, 63, 480, 126)).toMatchObject({
      x: 200,
      placement: "place-right"
    });
    expect(chartTooltipPosition(400, 63, 480, 126)).toMatchObject({
      x: 400,
      placement: "place-left"
    });
  });
});
