import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
type TProsp = {
  priceHistory: Array<{ date: string; price: number }>;
  animation?: {
    duration: number;
  };
};
export const LineChart = ({ priceHistory, animation }: TProsp) => {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let myChart: Chart | null = null;
    const totalDuration = animation ? animation.duration : 600;
    const delayBetweenPoints = totalDuration / priceHistory.length;
    const previousY = (ctx: any) =>
      ctx.index === 0
        ? ctx.chart.scales.y.getPixelForValue(100)
        : ctx.chart
            .getDatasetMeta(ctx.datasetIndex)
            .data[ctx.index - 1].getProps(["y"], true).y;
    if (chartContainer && chartContainer.current) {
      myChart = new Chart(chartContainer.current, {
        type: "line",
        data: {
          labels: priceHistory.map((x) => x.date),
          datasets: [
            {
              label: "Price",
              data: priceHistory.map((x, index) => {
                return {
                  y: x.price,
                  x: index,
                };
              }),
              borderColor: "#00A693",
              borderWidth: 1,
              pointRadius: 0,
            },
          ],
        },
        options: {
          animations: {
            x: {
              type: "number",
              easing: "linear",
              duration: delayBetweenPoints,
              from: NaN, // the point is initially skipped
              delay(ctx: any) {
                if (ctx.type !== "data" || ctx.xStarted) {
                  return 0;
                }
                ctx.xStarted = true;
                return ctx.index * delayBetweenPoints;
              },
            },
            y: {
              type: "number",
              easing: "linear",
              duration: delayBetweenPoints,
              from: previousY,
              delay(ctx: any) {
                if (ctx.type !== "data" || ctx.yStarted) {
                  return 0;
                }
                ctx.yStarted = true;
                return ctx.index * delayBetweenPoints;
              },
            },
          },
          interaction: {
            intersect: false,
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          // elements: {
          //   point: {
          //     radius: 0,
          //   },
          // },
          scales: {
            x: {
              type: "linear",
              // beginAtZero: false,
              grid: {
                drawOnChartArea: false,
              },

              ticks: {
                callback: function (value, index, values) {
                  if (index <= 0) {
                    return "";
                  }
                  if (index % 2 === 0) {
                    return priceHistory[index].date;
                  }
                },
              },
            },
            y: {
              grid: {
                drawBorder: false,
              },
              ticks: {
                callback: function (value, index, values) {
                  if (index % 2 === 0) {
                    return priceHistory[index].price;
                  }
                },
              },
            },
          },
        },
      });
    }
    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, []);
  return (
    <div>
      <canvas ref={chartContainer}></canvas>
    </div>
  );
};
