import { SeriesData } from "../../models/SeriesData";
import Chart from "react-apexcharts";

interface ICandleChart {
  data: SeriesData[];
  title: string;
}

export const CandleChart = (props: ICandleChart) => {
  const { data, title } = props;

  return (
    <Chart
      type="candlestick"
      series={[
        {
          data: data,
        },
      ]}
      options={{
        chart: {
          type: "candlestick",
          height: 400,
        },
        title: {
          text: title,
          align: "left",
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      }}
    />
  );
};
