import { Fragment, useEffect, useState } from "react";
import { Container, Divider, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CartSummary(props) {
  const navigate = useNavigate();
  const [totalCartAmount, setTotalCartAmount] = useState(0);
  const [shippingAmount, setShippingAmount] = useState(0);
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

  return (
    <Fragment>
      <Grid item xs={12} style={{ fontSize: 25 }}>
        Summary
      </Grid>
      <Grid item xs={12} style={{ fontSize: 25 }}>
        <Divider />
      </Grid>
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
          onClick={() => {
            navigate("/checkout");
          }}
          style={{
            backgroundColor: "#745D3E",
            width: "100%",
            color: "#ffffff",
          }}
        >
          Checkout
        </Button>
      </Grid>
    </Fragment>
  );
}
