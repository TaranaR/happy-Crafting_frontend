import { Box, Grid, Button } from "@mui/material";
import { Fragment } from "react";
import { Divider, makeStyles } from "@material-ui/core";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    marginTop: "3%",
    // border: "1px solid black",
  },
}));

export default function OrderedProductBySeller(props) {
  const classes = useStyles();
  const theme = useTheme();
  const {
    orderId,
    orderDetail,
    products,
    billAmount,
    isDispatched,
    isDelivered,
    user,
  } = props;

  const dispatchOrder = () => {
    props.onDispatchOrder(orderId);
  };

  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    props.onGenerateOTP(user, otp, orderId);
  };

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
                {orderDetail &&
                  orderDetail.map((item) => {
                    if (item.order_master_id === orderId) {
                      return (
                        products &&
                        products.map((i, index) => {
                          if (i.id === item.product_id) {
                            return (
                              <Grid container key={index}>
                                <Grid item xs={6} lg={3} md={3}>
                                  <img
                                    src={i.image}
                                    style={{ height: 100, width: 100 }}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={6}
                                  lg={3}
                                  md={3}
                                  display={{
                                    xs: "none",
                                    lg: "block",
                                    md: "block",
                                  }}
                                >
                                  {i.name}
                                </Grid>
                                <Grid
                                  item
                                  xs={6}
                                  lg={3}
                                  md={3}
                                  display={{
                                    xs: "block",
                                    lg: "none",
                                    md: "none",
                                  }}
                                >
                                  {i.name}
                                  <br />₹{i.price}
                                  <br />
                                  Qty :: {item.quantity}
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
                                  display={{
                                    xs: "none",
                                    lg: "block",
                                    md: "block",
                                  }}
                                >
                                  {item.quantity}
                                </Grid>
                                <Grid
                                  item
                                  xs={6}
                                  lg={3}
                                  md={3}
                                  style={{ textAlign: "left" }}
                                  display={{
                                    xs: "none",
                                    lg: "block",
                                    md: "block",
                                  }}
                                >
                                  ₹{i.price}
                                </Grid>
                              </Grid>
                            );
                          }
                        })
                      );
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
                &nbsp;&nbsp;{billAmount}
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "right",
                  marginTop: "5%",
                }}
              >
                <Button
                  style={{ color: isDispatched && "green" }}
                  onClick={dispatchOrder}
                  disabled={isDispatched}
                >
                  {isDispatched ? "Order Dispatched" : "Dispatch Order"}
                </Button>
                {isDispatched && !isDelivered && (
                  <Button
                    style={{ color: isDelivered && "green" }}
                    onClick={generateOtp}
                    disabled={isDelivered}
                  >
                    {isDelivered ? "Order Delivered" : "Generate OTP"}
                  </Button>
                )}
                {isDelivered && (
                  <Button
                    style={{ color: isDelivered && "green" }}
                    onClick={generateOtp}
                    disabled={isDelivered}
                  >
                    {isDelivered ? "Order Delivered" : "Generate OTP"}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
}
