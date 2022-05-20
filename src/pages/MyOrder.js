import { Fragment, useEffect } from "react";
import Moment from "moment";
import {
  getCartDataByUser,
  getOrderMasterByUser,
  getOrderDetailsByOrderMaster,
  getProductById,
} from "../redux/actions/userAction";
import {
  GET_CART_DATA_BY_USER_RESET,
  GET_ORDER_MASTER_RESET,
  GET_PRODUCT_BY_ID_RESET,
} from "../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core";
import { Container, Divider, Grid, Button, ButtonBase } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useNavigate } from "react-router-dom";
import ProductByOrderId from "../components/ProductsByOrderId";

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
  const userOrderMaster = useSelector((state) => state.userOrderMaster);
  const userOrderDetailsByOrderMaster = useSelector(
    (state) => state.userOrderDetailsByOrderMaster
  );
  const userGetProductById = useSelector((state) => state.userGetProductById);

  const { orderMasterData } = userOrderMaster;
  const { orderDetailsData } = userOrderDetailsByOrderMaster;
  const { prodInfo } = userGetProductById;

  console.log("---", prodInfo, orderDetailsData);

  useEffect(() => {
    if (prodInfo?.length) {
      console.log("first time");
      dispatch({ type: GET_PRODUCT_BY_ID_RESET });
    }
    dispatch({ type: GET_CART_DATA_BY_USER_RESET });
    dispatch(getCartDataByUser());
    dispatch({ type: GET_ORDER_MASTER_RESET });
    dispatch(getOrderMasterByUser());
  }, []);

  useEffect(() => {
    if (prodInfo?.length) {
      dispatch({ type: GET_PRODUCT_BY_ID_RESET });
    }
    if (orderDetailsData?.length && !prodInfo?.length) {
      console.log("---", orderDetailsData);
      orderDetailsData.map((item) => {
        Object.values(item).map((i) => {
          i.map((v) => {
            console.log("hiiiii", v.product_id);
            dispatch(getProductById(v.product_id));
          });
        });
      });
    }
  }, [orderDetailsData]);

  useEffect(() => {
    // if (prodInfo?.length) {
    //   dispatch({ type: GET_PRODUCT_BY_ID_RESET });
    // }
    if (orderMasterData) {
      orderMasterData.map((item) => {
        dispatch(getOrderDetailsByOrderMaster(item.id));
      });
    }
  }, [orderMasterData]);

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
          <Grid container style={{ marginTop: "2%" }}>
            <Grid item xs={12} lg={8} md={8}>
              {orderMasterData &&
                orderMasterData.map((item, index) => {
                  return (
                    <Grid item xs={12} style={{ padding: 5 }} key={index}>
                      <Accordion key={item["id"]}>
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
                            {Moment(item["created"]).format("DD-MM-YYYY")}
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ProductByOrderId
                            orderDetailsData={orderDetailsData}
                            orderId={item["id"]}
                            prodInfo={prodInfo}
                            billAmount={item["bill_amount"]}
                          />
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  );
                })}
              {!orderMasterData?.length && (
                <Grid item xs={12} lg={8} md={8}>
                  Your don't have any orders
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
            <Grid item xs={12} lg={12} md={12}></Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
