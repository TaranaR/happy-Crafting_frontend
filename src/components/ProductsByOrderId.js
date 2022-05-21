import { Box, Button, Grid } from "@mui/material";
import { Fragment, useEffect } from "react";
import { Divider, makeStyles } from "@material-ui/core";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    marginTop: "3%",
    // border: "1px solid black",
  },
}));

export default function ProductByOrderId(props) {
  const classes = useStyles();
  const theme = useTheme();
  const orderId = props.orderId;
  const orderDetailsData = props.orderDetailsData;
  const billAmount = props.billAmount;
  console.log(orderDetailsData);
  return (
    <Fragment>
      <Box className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid
                item
                xs={12}
                lg={3}
                md={3}
                display={{ xs: "none", lg: "block", md: "block" }}
              >
                Image
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                md={3}
                display={{ xs: "none", lg: "block", md: "block" }}
              >
                Name
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                md={3}
                display={{ xs: "none", lg: "block", md: "block" }}
              >
                Quantity
              </Grid>
              <Grid
                item
                xs={12}
                lg={3}
                md={3}
                display={{ xs: "none", lg: "block", md: "block" }}
              >
                Price
              </Grid>
              <Grid
                item
                xs={12}
                style={{ marginTop: 10 }}
                display={{ xs: "none", lg: "block", md: "block" }}
              >
                <Divider />
              </Grid>

              <Grid item xs={12} style={{ marginTop: 20 }}>
                {orderDetailsData &&
                  orderDetailsData.map((item) => {
                    if (item[orderId]) {
                      const { orderDetails, productDetails } = item[orderId];
                      return orderDetails.map((i, index) => {
                        return (
                          <Grid container key={index}>
                            <Grid item xs={6} lg={3} md={3}>
                              <img
                                src={productDetails[index].image}
                                style={{ height: 100, width: 100 }}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              lg={3}
                              md={3}
                              display={{ xs: "none", lg: "block", md: "block" }}
                            >
                              {productDetails[index].name}
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              lg={3}
                              md={3}
                              display={{ xs: "block", lg: "none", md: "none" }}
                            >
                              {productDetails[index].name}
                              <br />₹{productDetails[index].price}
                              <br />
                              Qty :: {i.quantity}
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
                              {i.quantity}
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              lg={3}
                              md={3}
                              style={{ textAlign: "left" }}
                              display={{ xs: "none", lg: "block", md: "block" }}
                            >
                              ₹{productDetails[index].price}
                            </Grid>
                          </Grid>
                        );
                      });
                    }
                  })}
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid
                item
                xs={10}
                style={{
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                Bill Amount &nbsp;&nbsp;
                <Divider orientation="vertical" />
                &nbsp;&nbsp; {billAmount}
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Button>Track Order</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
