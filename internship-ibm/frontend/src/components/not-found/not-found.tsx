import { grey } from "@mui/material/colors";
import { Box, BoxProps, styled, Typography } from "@mui/material";

export const PolygonBox = styled(Box)<BoxProps>({
  color: grey[800],
  clipPath:
    "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
  backgroundColor: grey[300],
  padding: "100px",
  position: "relative",
  "&:before": {
    content: '""',
    clipPath:
      "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
    position: "absolute",
    left: "20px",
    top: "-10px",
    height: "100%",
    width: "100%",
    backgroundColor: grey[200],
  },
});

export const NotFound = () => {
  return (
    <PolygonBox>
      <Box style={{ position: "relative" }}>
        <img
          src={process.env.PUBLIC_URL + "/noResults.gif"}
          alt="No results found"
          width="280px"
          height="280px"
        />
        <Typography variant="h3" color={grey[800]}>
          No results were found
        </Typography>
      </Box>
    </PolygonBox>
  );
};
