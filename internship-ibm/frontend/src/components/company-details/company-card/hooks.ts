import { useEffect, useState } from "react";
import { getStockDetails } from "../../../services/stock-service";
import _ from "lodash";
import { SeriesData } from "../../../models/SeriesData";
import { IStockForm } from "../../../models/IStockForm";

export const useChartState = (
  expanded: boolean,
  searchData: IStockForm | undefined
) => {
  const [chartData, setChartData] = useState<SeriesData[]>([]);

  useEffect(() => {
    if (expanded) {
      if (searchData) {
        getStockDetails(searchData).then((resp) => {
          const seriesData = _.fill(Array(resp.data.c.length), null).map(
            (c, index) =>
              ({
                x: new Date(resp.data.t[index]),
                y: [
                  resp.data.o[index],
                  resp.data.l[index],
                  resp.data.h[index],
                  resp.data.c[index],
                ],
              } as unknown as SeriesData)
          );
          setChartData(seriesData);
        });
      }
    }
  }, [expanded, searchData]);

  return chartData;
};
