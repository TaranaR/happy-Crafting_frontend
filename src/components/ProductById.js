import { Divider } from "@material-ui/core";
import { Grid } from "@mui/material";
import { Fragment } from "react";
import { useTheme } from "@mui/material/styles";

export default function ProductById(props) {
  const prodInfo = props.prodInfo;
  const prodId = props.prodId;
  const qty = props.qty;
  const theme = useTheme();
  //   console.log(prodInfo);
  //   console.log(prodId);

  return (
    <Fragment>
      {prodInfo?.length &&
        prodInfo.map((item, index) => {
          return (
            item.id === prodId && (
              <Grid container key={index}>
                <Grid item xs={6} lg={3} md={3}>
                  <img src={item.image} style={{ height: 100, width: 100 }} />
                </Grid>
                <Grid
                  item
                  xs={6}
                  lg={3}
                  md={3}
                  display={{ xs: "none", lg: "block", md: "block" }}
                >
                  {item.name}
                </Grid>
                <Grid
                  item
                  xs={6}
                  lg={3}
                  md={3}
                  display={{ xs: "block", lg: "none", md: "none" }}
                >
                  {item.name}
                  <br />₹{item.price}
                  <br />
                  Qty ::  {qty}
                </Grid>
                <Grid
                  item
                  xs={6}
                  lg={3}
                  md={3}
                  sx={{
                    textAlign: "center",
                    [theme.breakpoints.down("sm")]: {
                      textAlign: "left",
                    },
                  }}
                  display={{ xs: "none", lg: "block", md: "block" }}
                >
                  {qty}
                </Grid>
                <Grid
                  item
                  xs={6}
                  lg={3}
                  md={3}
                  style={{ textAlign: "left" }}
                  display={{ xs: "none", lg: "block", md: "block" }}
                >
                  ₹{item.price}
                </Grid>
              </Grid>
            )
          );
        })}
    </Fragment>
  );
}
