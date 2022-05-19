import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Radio, Box } from "@mui/material";
import { Divider } from "@material-ui/core";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  getShippingAddressById,
  getCartDataByUser,
  addOrderMaster,
} from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { GET_CART_DATA_BY_USER_RESET } from "../constants/userConstants";
import ViewCart from "./ViewCart";
import CartSummary from "../components/CartSummary";
import Modal from "@mui/material/Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    marginTop: "3%",
    //border: "1px solid black",
  },
  modelWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 5,
    width: "45%",
    maxHeight: "99%",
    [theme.breakpoints.down("sm")]: {
      height: "70%",
    },
    [theme.breakpoints.down("md")]: {
      height: "100%",
    },
    backgroundColor: "white",
    boxShadow: 24,
    p: 4,
  },
}));

export default function ConfirmOrder() {
  const location = useLocation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const addId = location.state.addId;
  const totalBillAmount = location.state.totalBillAmount;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [open, setOpen] = useState(false);

  const userGetShippingAddressById = useSelector(
    (state) => state.userGetShippingAddressById
  );
  const userGetCartDataByUser = useSelector(
    (state) => state.userGetCartDataByUser
  );
  const userAddOrderMaster = useSelector((state) => state.userAddOrderMaster);

  const { address } = userGetShippingAddressById;
  const { cartData } = userGetCartDataByUser;
  const { orderData } = userAddOrderMaster;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    dispatch(getShippingAddressById(addId));
    dispatch({ type: GET_CART_DATA_BY_USER_RESET });
    dispatch(getCartDataByUser());
  }, []);

  useEffect(() => {
    if (orderData) {
      handleOpen();
    }
  }, [orderData]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const confirmOrder = () => {
    const order = {
      address: addId,
      bill_amount: totalBillAmount,
    };
    dispatch(addOrderMaster(order));
  };

  return (
    <Fragment>
      <Container className={classes.root}>
        <Modal open={open} onClose={handleClose}>
          <Box className={classes.modelWrapper}>Order Confirm</Box>
        </Modal>
        <Grid container>
          <Grid item xs={12} style={{ fontSize: 30 }}>
            Checkout
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container style={{ marginTop: "3%", margin: "10px" }}>
            <Grid item xs={12} lg={8} md={8}>
              <Grid item xs={12} sx={{ textDecoration: "underline" }}>
                Shipping Address
              </Grid>
              <Grid item xs={12} sx={{ color: "GrayText", marginTop: 1 }}>
                {address && address["title"]}
                <br />
                {address && address["address"]},
                <br />
                {address && address["city"]},
                <br />
                {address && address["state"]}-{address && address["pincode"]}
                <br />
                (M) {address && address["phone_number"]}
              </Grid>
              <Grid item xs={12} style={{ marginTop: 30 }}>
                <Divider />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ marginTop: 30, textDecoration: "underline" }}
              >
                Payment Method
              </Grid>
              <Grid item xs={12} style={{ marginTop: 25 }}>
                <RadioGroup
                  name="radio-buttons-group"
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                  }}
                >
                  <FormControlLabel
                    value="cash"
                    control={<Radio />}
                    label="Cash on delivery"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
              ms={4}
              sx={{
                padding: 3,
                [theme.breakpoints.down("md")]: { marginTop: 10 },
              }}
            >
              <Grid
                container
                style={{
                  // border: "1px solid black",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  padding: 20,
                }}
              >
                <CartSummary
                  cartData={cartData}
                  onConfirmOrder={confirmOrder}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
