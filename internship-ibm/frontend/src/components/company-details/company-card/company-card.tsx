import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import { CompanyData } from "../../../models/CompanyData";
import { Link } from "@mui/material";
import { getStockDetails } from "../../../services/stock-service";
import { useSelector } from "react-redux";
import { selectSearchData } from "../../../stores/selectors";
import { StockCandles } from "../../../models/StockCandles";
import Chart from "react-apexcharts";
import _ from "lodash";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ICompanyCardProps {
  companyDetails: CompanyData;
}

type SeriesData = {
  x: string;
  y: [string, string, string, string];
};

export const CompanyCard = (props: ICompanyCardProps) => {
  const { companyDetails } = props;

  const [expanded, setExpanded] = useState<boolean>(false);
  const [chartData, setChartData] = useState<SeriesData[]>([]);

  const searchData = useSelector(selectSearchData);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (expanded) {
      if (searchData) {
        getStockDetails(searchData).then((resp) => {
          // setChartData(resp.data);
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
          console.log("seriesData", seriesData);
        });
      }
    }
  }, [expanded, searchData]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            alt={companyDetails.ticker}
            sx={{ width: 64, height: 64 }}
            src={companyDetails.logo}
          />
        }
        title={<Typography variant="h5">{companyDetails.ticker}</Typography>}
        subheader={<Typography variant="h6">{companyDetails.name}</Typography>}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Country: {companyDetails.country}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Currency: {companyDetails.currency}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <Link href={companyDetails.weburl} target="_blank">
            <ShareIcon />
          </Link>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Diagram:</Typography>
          <Chart
            type="candlestick"
            series={[
              {
                data: chartData,
              },
            ]}
            options={{
              chart: {
                type: "candlestick",
                height: 350,
              },
              title: {
                text: "CandleStick Chart",
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
        </CardContent>
      </Collapse>
    </Card>
  );
};
