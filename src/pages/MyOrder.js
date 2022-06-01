import { Fragment, useEffect, useState } from "react";
import Moment from "moment";
import {
  getCartDataByUser,
  getOrderMasterByUser,
  getOrderDetailsByOrderMaster,
  addReviewForProduct,
} from "../redux/actions/userAction";
import {
  GET_CART_DATA_BY_USER_RESET,
  GET_ORDER_MASTER_RESET,
  GET_PRODUCT_BY_ID_RESET,
} from "../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { Container, Divider, Grid, Button, ButtonBase } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import ProductByOrderId from "../components/ProductsByOrderId";
import TrackOrder from "../components/TrackOrder";
const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    marginTop: "3%",
    // border: "1px solid black",
  },
}));

export default function MyOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const [orderId, setOrderId] = useState();
  const userOrderMaster = useSelector((state) => state.userOrderMaster);
  const userOrderDetailsByOrderMaster = useSelector(
    (state) => state.userOrderDetailsByOrderMaster
  );

  const { orderMasterData } = userOrderMaster;
  const { orderDetailsData } = userOrderDetailsByOrderMaster;

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch({ type: GET_CART_DATA_BY_USER_RESET });
    dispatch(getCartDataByUser());
    dispatch({ type: GET_ORDER_MASTER_RESET });
    dispatch(getOrderMasterByUser());
  }, []);

  useEffect(() => {
    if (orderMasterData) {
      orderMasterData.map((item) => {
        dispatch(getOrderDetailsByOrderMaster(item.id));
      });
    }
  }, [orderMasterData]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const addReviewHandler = (review) => {
    dispatch(addReviewForProduct(review));
  };

  return (
    <Fragment>
      <Container className={classes.root}>
        <Grid container>
          <Grid item xs={12} style={{ fontSize: 30 }}>
            My Order
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container style={{ marginTop: "2%" }} spacing={3}>
            <Grid item xs={12} lg={8} md={8}>
              {orderMasterData &&
                orderMasterData.map((item, index) => {
                  return (
                    <Grid item xs={12} style={{ padding: 5 }} key={index}>
                      <Accordion
                        key={item["id"]}
                        expanded={expanded === index}
                        onChange={handleChange(index)}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            Order Date &nbsp;&nbsp;&nbsp;
                            {Moment(item["created"]).format(
                              "DD-MM-YYYY, HH:mm"
                            )}
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ProductByOrderId
                            orderDetailsData={orderDetailsData}
                            orderId={item["id"]}
                            billAmount={item["bill_amount"]}
                          />
                          <Grid
                            item
                            xs={12}
                            style={{
                              display: "flex",
                              justifyContent: "right",
                            }}
                          >
                            <Button
                              onClick={() => {
                                setOrderId(item["id"]);
                              }}
                            >
                              Track Order
                            </Button>
                          </Grid>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  );
                })}
              {!orderMasterData?.length && (
                <Grid item xs={12} lg={8} md={8}>
                  You don't have any orders
                  <Button
                    onClick={() => {
                      navigate("/WallArt");
                    }}
                  >
                    Continue Shopping
                  </Button>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} lg={4} md={4}>
              {orderId && (
                <TrackOrder
                  orderId={orderId}
                  orderMasterData={orderMasterData}
                  orderDetailsData={orderDetailsData}
                  onAddReview={addReviewHandler}
                />
              )}
              {!orderMasterData?.length
                ? ""
                : !orderId && (
                    <Grid
                      item
                      xs={12}
                      style={{ fontFamily: ["Lora", "serif"].join(",") }}
                    >
                      Select "Track Order" and see where your order is at.
                    </Grid>
                  )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
