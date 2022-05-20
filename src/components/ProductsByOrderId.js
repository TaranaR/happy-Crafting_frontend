import { Box, Button, Grid } from "@mui/material";
import { Fragment, useEffect } from "react";
import { Divider, makeStyles } from "@material-ui/core";
import ProductById from "./ProductById";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    marginTop: "3%",
    // border: "1px solid black",
  },
}));

export default function ProductByOrderId(props) {
  const classes = useStyles();
  const orderId = props.orderId;
  const orderDetailsData = props.orderDetailsData;
  const prodInfo = props.prodInfo;
  const billAmount = props.billAmount;

  //   console.log(prodInfo);

  //   console.log("--", orderId, orderDetailsData, billAmount);
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
                    return (
                      item[orderId] &&
                      item[orderId].map((i, index) => {
                        return (
                          <Grid item xs={12} key={index}>
                            <ProductById
                              prodInfo={prodInfo}
                              prodId={i.product_id}
                              qty={i.quantity}
                            />
                          </Grid>
                        );
                      })
                    );
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
