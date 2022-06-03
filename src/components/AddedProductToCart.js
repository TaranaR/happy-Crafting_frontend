import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Grid, Button, TextField } from "@material-ui/core";
import { addToCart } from "../redux/actions/userAction";

export default function AddedProductToCart(props) {
  const [prodQty, setProdQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //console.log(props.cartData["quantity"]);

  const incrementQtyHandler = () => {
    setProdQty((prevState) => prevState + 1);
    const cart = {
      quantity: 1,
      product: props.prodInfo["id"],
    };

    dispatch(addToCart(cart));
  };

  const decrementQtyHandler = () => {
    if (prodQty > 1) {
      setProdQty((prevState) => prevState - 1);
      const cart = {
        quantity: -1,
        product: props.prodInfo["id"],
      };

      dispatch(addToCart(cart));
    }
  };

  useEffect(() => {
    setProdQty(props.qty);
  }, []);

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

          <Grid item xs={12}>
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
            />

            <Button onClick={incrementQtyHandler} style={{ color: "#000000" }}>
              +
            </Button>
          </Grid>
          <Grid item xs={12}>
            ₹{props.prodInfo["price"]}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/checkout");
              }}
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
