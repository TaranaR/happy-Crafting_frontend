import { Container, Grid, Button, TextField } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addToCart } from "../redux/actions/userAction";

export default function AddedProductToCart(props) {
  const [prodQty, setProdQty] = useState(1);
  const dispatch = useDispatch();

  //console.log(props.cartData["quantity"]);

  //   const incrementQtyHandler = () => {
  //     setProdQty((prevState) => prevState + 1);
  //     addToCartHandler(props.qty + 1);
  //   };

  //   const decrementQtyHandler = () => {
  //     if (prodQty > 1) {
  //       setProdQty((prevState) => prevState - 1);
  //     }
  //     addToCartHandler(props.qty - 1);
  //   };

  //   const addToCartHandler = (qty) => {
  //     const cart = {
  //       quantity: qty,
  //       product: props.prodInfo["id"],
  //     };

  //     dispatch(addToCart(cart));
  //   };

  //   useEffect(() => {
  //     setProdQty(props.qty);
  //   }, []);

  return (
    <Fragment>
      <Container style={{ padding: "30px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            This was added to your cart.
          </Grid>
          <Grid item xs={12} style={{ height: "30vh" }}>
            <img
              src={props.prodInfo["image"]}
              style={{
                width: "60%",
                height: "100%",
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ fontSize: 20, fontWeight: "bold" }}>
            {props.prodInfo["name"]}
          </Grid>

          {/* <Grid item xs={12}>
            <Button onClick={decrementQtyHandler} style={{ color: "#000000" }}>
              -
            </Button>
            <TextField
              variant="outlined"
              size="small"
              style={{
                width: "50px",
                border: "none",
                // marginLeft: "10px",
              }}
              value={prodQty}
              onChange={addToCartHandler}
            />

            <Button onClick={incrementQtyHandler} style={{ color: "#000000" }}>
              +
            </Button>
          </Grid> */}
          <Grid item xs={12}>
            ₹{props.prodInfo["price"]}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#745D3E",
                width: "70%",
                //marginBottom: "10%",
                color: "#ffffff",
              }}
            >
              CheckOut
            </Button>
          </Grid>
          <Grid item xs={12}>
            <NavLink to="/viewcart" style={{ fontSize: 18, color: "#000000" }}>
              View Cart
            </NavLink>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
