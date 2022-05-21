import { Fragment, useEffect, useState } from "react";
import Moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  getOrderedProductBySeller,
  orderDispatchedBySeller,
} from "../../../redux/actions/sellerAction";
import { useDispatch, useSelector } from "react-redux";
import ProductByOrderId from "../../../components/ProductsByOrderId";
import OrderedProductBySeller from "../../../components/OrderedProductBySeller";
import { GET_ORDERED_PRODUCT_SELLER_RESET } from "../../../constants/sellerConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "13%",
    [theme.breakpoints.down("md")]: {
      marginTop: "10%",
      textAlign: "left",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "10%",
      textAlign: "center",
    },
  },
}));

export default function SellerOrder() {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const [od, setOd] = useState([]);
  const sellerGetOrderedProductBySeller = useSelector(
    (state) => state.sellerGetOrderedProductBySeller
  );

  const sellerOrderDispatchedBySeller = useSelector(
    (state) => state.sellerOrderDispatchedBySeller
  );

  const { success } = sellerOrderDispatchedBySeller;

  const { orderedProduct } = sellerGetOrderedProductBySeller;

  const { orderMaster, orderDetail, products } = orderedProduct;

  useEffect(() => {
    dispatch({ type: GET_ORDERED_PRODUCT_SELLER_RESET });
    dispatch(getOrderedProductBySeller());
  }, []);

  useEffect(() => {
    if (success) {
      dispatch({ type: GET_ORDERED_PRODUCT_SELLER_RESET });
      dispatch(getOrderedProductBySeller());
    }
  }, [success]);
  // console.log(orderMaster, orderDetail, products);
  // console.log("-----", od);

  const dispatchOrder = (id) => {
    dispatch(orderDispatchedBySeller(id));
  };

  return (
    <Fragment>
      <Container className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ fontSize: 20 }}>
            Orders
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            {orderMaster &&
              orderMaster.map((item, index) => {
                return (
                  <Grid item xs={12} style={{ padding: 5 }} key={index}>
                    <Accordion key={index}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        Order Date &nbsp;&nbsp;&nbsp;
                        {Moment(item["created"]).format("DD-MM-YYYY")}
                      </AccordionSummary>
                      <AccordionDetails>
                        <OrderedProductBySeller
                          orderId={item.id}
                          orderDetail={orderDetail}
                          products={products}
                          billAmount={item.bill_amount}
                          isDispatched={item.isDispatched}
                          onDispatchOrder={dispatchOrder}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                );
              })}
            {!orderMaster?.length && (
              <Grid item xs={12} lg={8} md={8}>
                You haven't received any order.
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
