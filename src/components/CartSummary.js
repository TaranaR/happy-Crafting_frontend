import { Fragment, useEffect, useState } from "react";
import { Container, Divider, Grid, Button, Alert } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function CartSummary(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [totalCartAmount, setTotalCartAmount] = useState(0);
  const [shippingAmount, setShippingAmount] = useState(0);
  const [error, setError] = useState("");
  //const [totalBillAmount, setTotalBillAmount] = useState(0);
  const cartData = props.cartData;

  useEffect(() => {
    setTotalCartAmount(0);
    setShippingAmount(0);
    if (cartData) {
      cartData.map((item) => {
        setTotalCartAmount((prevState) => (prevState += item["totalAmount"]));
        setShippingAmount((prevState) => (prevState += item["quantity"] * 20));
      });
    }
  }, [cartData]);

  const handleSubmit = () => {
    if (location.pathname === "/checkout" && !props.addressId) {
      setError("Select Address");
    }
    if (location.pathname === "/placeorder" && !props.paymentMethod) {
      console.log("in placeorder");
      setError("Select Payment Method");
    }

    if (location.pathname === "/viewcart" && cartData?.length > 0) {
      navigate("/checkout");
    }
    if (location.pathname === "/checkout" && props.addressId) {
      navigate("/placeorder", {
        state: {
          addId: props.addressId,
          totalBillAmount: totalCartAmount + shippingAmount,
        },
      });
    }
    if (location.pathname === "/placeorder" && props.paymentMethod) {
      props.onConfirmOrder();
    }
  };

  return (
    <Fragment>
      <Grid item xs={12} style={{ fontSize: 25 }}>
        Summary
      </Grid>
      <Grid item xs={12} style={{ fontSize: 25 }}>
        <Divider />
      </Grid>
      {cartData?.length ? (
        <>
          <Grid
            item
            xs={12}
            style={{
              marginTop: 30,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>Your Cart Items</div>
            <div style={{ fontWeight: "bold" }}>₹{totalCartAmount}</div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              marginTop: 25,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>Estimated Shipping</div>
            <div style={{ fontWeight: "bold" }}>₹{shippingAmount}</div>
          </Grid>
          <Grid item xs={12} style={{ fontSize: 12, color: "GrayText" }}>
            You are charged with ₹20 per product
          </Grid>
          <Grid item xs={12} style={{ marginTop: "5%" }}>
            <Divider />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>Estimated Total</div>
            <div style={{ fontWeight: "bold" }}>
              ₹{totalCartAmount + shippingAmount}
            </div>
          </Grid>
          <Grid item xs={12} style={{ fontSize: 12, color: "GrayText" }}>
            Tax calculated at checkout
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              textAlign: "center",
              marginTop: 80,
            }}
          >
            <Button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#745D3E",
                width: "100%",
                color: "#ffffff",
              }}
            >
              {location.pathname === "/placeorder"
                ? "Comfirm Order"
                : "Continue Checkout"}
            </Button>
            {location.pathname === "/checkout" && error && (
              <Grid item xs={12} sx={{ marginTop: 2, color: "red" }}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
            {location.pathname === "/placeorder" && error && (
              <Grid item xs={12} sx={{ marginTop: 2, color: "red" }}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
          </Grid>
        </>
      ) : (
        <Grid
          item
          xs={12}
          style={{
            fontSize: 15,
            color: "GrayText",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          You have to item in your cart.
        </Grid>
      )}
    </Fragment>
  );
}
