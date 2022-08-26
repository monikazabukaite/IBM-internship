import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCallback, useState } from "react";
import { CompanyData } from "../../../models/CompanyData";
import { Button, Link } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSearchData } from "../../../stores/selectors";
import { CandleChart } from "../../candle-chart";
import { useChartState } from "./hooks";

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

export const CompanyCard = (props: ICompanyCardProps) => {
  const { companyDetails } = props;

  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = useCallback(() => {
    setExpanded((prevExpanded) => !prevExpanded);
  }, []);

  const searchData = useSelector(selectSearchData);

  const chartData = useChartState(expanded, searchData);

  return (
    <Card sx={{ minWidth: "350px" }}>
      <CardHeader
        avatar={
          <Avatar
            alt={companyDetails.ticker}
            sx={{ width: 64, height: 64 }}
            src={companyDetails.logo}
          />
        }
        title={<Typography variant="h5">{companyDetails.ticker}</Typography>}
        subheader={
          <Button variant="text" onClick={handleExpandClick}>
            <Typography variant="h6">{companyDetails.name}</Typography>
          </Button>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <strong>Country</strong>: {companyDetails.country}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Currency</strong>: {companyDetails.currency}
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
          <CandleChart data={chartData} title={companyDetails.ticker} />
        </CardContent>
      </Collapse>
    </Card>
  );
};
