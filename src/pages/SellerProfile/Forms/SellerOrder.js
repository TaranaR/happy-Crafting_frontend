import { Fragment, useEffect, useState } from "react";
import Moment from "moment";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Grid,
  Box,
  TextField,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  getOrderedProductBySeller,
  orderDelivered,
  orderDispatchedBySeller,
  sendEmail,
} from "../../../redux/actions/sellerAction";
import { useDispatch, useSelector } from "react-redux";

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
  modelWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 5,
    width: "25%",
    maxHeight: "55%",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "55%",
      width: "60%",
    },
    [theme.breakpoints.down("md")]: {
      maxHeight: "55%",
      width: "60%",
    },
    backgroundColor: "white",
    boxShadow: 24,
    p: 4,
  },
}));

export default function SellerOrder() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [otp, setOtp] = useState(0);
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [enteredOTP, setEnteredOTP] = useState("");

  const sellerGetOrderedProductBySeller = useSelector(
    (state) => state.sellerGetOrderedProductBySeller
  );
  const sellerOrderDispatchedBySeller = useSelector(
    (state) => state.sellerOrderDispatchedBySeller
  );

  const sellerOrderDelivered = useSelector(
    (state) => state.sellerOrderDelivered
  );

  const { success } = sellerOrderDispatchedBySeller;
  const { orderedProduct } = sellerGetOrderedProductBySeller;
  const { orderMaster, orderDetail, products, users } = orderedProduct;
  const { success: deliveredSuccess } = sellerOrderDelivered;

  let errorContent = "";

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
  useEffect(() => {
    if (deliveredSuccess) {
      dispatch({ type: GET_ORDERED_PRODUCT_SELLER_RESET });
      dispatch(getOrderedProductBySeller());
    }
  }, [deliveredSuccess]);

  const dispatchOrder = (id) => {
    dispatch(orderDispatchedBySeller(id));
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const generateOtp = (userId, otp, orderId) => {
    if (users) {
      users.map((item) => {
        const content = {
          to_user: item.email,
          otp: otp,
        };
        if (userId === item.id) {
          dispatch(sendEmail(content));
        }
        setOtp(otp);
        console.log(orderId);
        setOrderId(orderId);
      });
    }
    console.log("g", otp);
    handleOpen();
  };

  const verifyOtp = () => {
    // console.log("v", typeof otp, typeof enteredOTP);
    if (parseInt(enteredOTP) === otp) {
      console.log("OTP Varified", otp, orderId);
      dispatch(orderDelivered(orderId));
      handleClose();
    }
    errorContent = <Alert severity="error">OTP didn't batch</Alert>;
  };

  // console.log(emailSendData, otp);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Fragment>
      <Container className={classes.root}>
        <Modal open={open}>
          <Box className={classes.modelWrapper}>
            <Grid container spacing={3} style={{ marginTop: "5%", padding: 5 }}>
              <Grid item xs={12} style={{ textAlign: "center", fontSize: 20 }}>
                Enter OTP
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <TextField
                  type="number"
                  size="small"
                  style={{ marginLeft: "5%", width: "90%" }}
                  onChange={(e) => {
                    setEnteredOTP(e.target.value);
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  textAlign: "center",
                  width: "25%",
                  marginBottom: "5%",
                }}
              >
                <Button variant="contained" onClick={verifyOtp}>
                  Verify
                </Button>
              </Grid>
              {errorContent && (
                <Grid item xs={12}>
                  {errorContent}
                </Grid>
              )}
            </Grid>
          </Box>
        </Modal>
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
                    <Accordion
                      key={index}
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
                          isDelivered={item.isDelivered}
                          onDispatchOrder={dispatchOrder}
                          onGenerateOTP={generateOtp}
                          user={item.owner}
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
