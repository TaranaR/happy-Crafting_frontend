import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Grid,
  Radio,
  TextField,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getCartDataByUser } from "../redux/actions/userAction";
import HomeIcon from "@mui/icons-material/Home";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import RadioGroup from "@mui/material/RadioGroup";
import Modal from "@mui/material/Modal";

import {
  GET_CART_DATA_BY_USER_RESET,
  GET_SHIPPING_ADDRESS_BY_USER_RESET,
} from "../constants/userConstants";
import {
  getShippingAddressByUser,
  addShippingAddress,
  removeShippingAddress,
} from "../redux/actions/userAction";
import ViewCart from "./ViewCart";
import CartSummary from "../components/CartSummary";
import { useTheme } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { NavLink } from "react-router-dom";
import RemoveAddress from "../components/RemoveAddress";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    marginTop: "3%",
    // border: "1px solid black",
  },
  formData: {
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#745D3E",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#745D3E",
      },
    },
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

export default function Checkout() {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [shippingAddId, setShippingAddId] = useState(0);
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [shipAdd, setShipAdd] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPinCode] = useState("");
  const [phone, setPhone] = useState("");

  //selector
  const userGetCartDataByUser = useSelector(
    (state) => state.userGetCartDataByUser
  );

  const userGetShippingAddressByUser = useSelector(
    (state) => state.userGetShippingAddressByUser
  );

  const userAddShippingAddress = useSelector(
    (state) => state.userAddShippingAddress
  );

  const userRemoveShippingAddress = useSelector(
    (state) => state.userRemoveShippingAddress
  );

  const { address } = userGetShippingAddressByUser;
  const { cartData } = userGetCartDataByUser;
  const { addressData } = userAddShippingAddress;
  const { success } = userRemoveShippingAddress;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    dispatch({ type: GET_CART_DATA_BY_USER_RESET });
    dispatch(getCartDataByUser());
    dispatch({ type: GET_SHIPPING_ADDRESS_BY_USER_RESET });
    dispatch(getShippingAddressByUser());
  }, []);

  useEffect(() => {
    if (addressData) {
      dispatch({ type: GET_SHIPPING_ADDRESS_BY_USER_RESET });
      dispatch(getShippingAddressByUser());
    }
  }, [addressData]);

  useEffect(() => {
    if (success) {
      dispatch({ type: GET_SHIPPING_ADDRESS_BY_USER_RESET });
      dispatch(getShippingAddressByUser());
    }
  }, [success]);

  const addAddress = () => {
    setError("");
    if (
      title === "" ||
      firstName === "" ||
      lastName === "" ||
      shipAdd === "" ||
      city === "" ||
      country === "" ||
      pincode === "" ||
      phone === ""
    ) {
      setError("Enter all information.");
      return;
    }

    const add = {
      title: title,
      first_name: firstName,
      last_name: lastName,
      address: shipAdd,
      city: city,
      state: state,
      country: country,
      pincode: pincode,
      phone_number: phone,
    };

    dispatch(addShippingAddress(add));

    setFirstName("");
    setLastName("");
    setShipAdd("");
    setCountry("");
    setState("");
    setCity("");
    setPinCode("");
    setPhone("");
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const removeShippingAddressHandler = (id) => {
    dispatch(removeShippingAddress(id));
    console.log(id);
    setOpen(false);
  };

  return (
    <Fragment>
      <Container className={classes.root}>
        <Modal open={open} onClose={handleClose}>
          <Box className={classes.modelWrapper}>
            <RemoveAddress
              onRemoveShippingAddress={removeShippingAddressHandler}
            />
          </Box>
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
              {address?.length ? (
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>Select from existing address</div>
                  <div>
                    <Button
                      style={{ textDecoration: "underline", color: "inherit" }}
                      onClick={handleOpen}
                    >
                      Remove Address
                    </Button>
                  </div>
                </Grid>
              ) : (
                ""
              )}

              <Grid item xs={12} style={{ marginTop: "10px" }}>
                <RadioGroup
                  name="radio-buttons-group"
                  onChange={(e) => {
                    setShippingAddId(e.target.value);
                  }}
                >
                  {address &&
                    address.map((item) => {
                      return (
                        <Accordion key={item["id"]}>
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            {item["title"]}
                          </AccordionSummary>
                          <AccordionDetails>
                            <FormControlLabel
                              value={`${item["id"]}`}
                              control={<Radio />}
                              label={`${item["address"]},${item["city"]}-${item["pincode"]}`}
                            />
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                </RadioGroup>
              </Grid>
              {address?.length ? (
                <Grid item xs={12} style={{ marginTop: 30 }}>
                  <Divider />
                </Grid>
              ) : (
                ""
              )}

              <Grid item xs={12} style={{ marginTop: 10 }}>
                <Grid container>
                  <Grid item xs={12} style={{ fontSize: 20 }}>
                    Add new shipping address
                  </Grid>
                  <Grid item xs={12}>
                    <Stack
                      direction="row"
                      spacing={1}
                      style={{ marginTop: 10 }}
                    >
                      <Chip
                        label="Home"
                        icon={
                          <HomeIcon
                            style={{ color: title === "Home" ? "#ffffff" : "" }}
                          />
                        }
                        style={{
                          padding: 10,
                          backgroundColor: title === "Home" ? "#745D3E" : "",
                          color: title === "Home" ? "#ffffff" : "",
                        }}
                        onClick={() => {
                          setTitle("Home");
                        }}
                      />
                      <Chip
                        label="Office"
                        icon={
                          <HomeWorkIcon
                            style={{
                              color: title === "Office" ? "#ffffff" : "",
                            }}
                          />
                        }
                        style={{
                          padding: 10,
                          backgroundColor: title === "Office" ? "#745D3E" : "",
                          color: title === "Office" ? "#ffffff" : "",
                        }}
                        onClick={() => {
                          setTitle("Office");
                        }}
                      />
                      <Chip
                        label="Other"
                        icon={
                          <OtherHousesIcon
                            style={{
                              color: title === "Other" ? "#ffffff" : "",
                            }}
                          />
                        }
                        style={{
                          padding: 10,
                          backgroundColor: title === "Other" ? "#745D3E" : "",
                          color: title === "Other" ? "#ffffff" : "",
                        }}
                        onClick={() => {
                          setTitle("Other");
                        }}
                      />
                    </Stack>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    className={classes.formData}
                    style={{ marginTop: 0 }}
                  >
                    <Grid item xs={6}>
                      <TextField
                        value={firstName}
                        required
                        fullWidth
                        placeholder="First Name"
                        onChange={(e) => {
                          setFirstName(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        value={lastName}
                        required
                        fullWidth
                        placeholder="Last Name"
                        onChange={(e) => {
                          setLastName(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        value={shipAdd}
                        required
                        fullWidth
                        placeholder="Address"
                        onChange={(e) => {
                          setShipAdd(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        value={country}
                        required
                        fullWidth
                        placeholder="Country"
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        value={state}
                        required
                        fullWidth
                        placeholder="State"
                        onChange={(e) => {
                          setState(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        value={city}
                        required
                        fullWidth
                        placeholder="City"
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        value={pincode}
                        type="number"
                        required
                        fullWidth
                        placeholder="Pincode"
                        inputProps={{ maxLength: 6 }}
                        onChange={(e) => {
                          setPinCode(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        value={phone}
                        type="number"
                        required
                        fullWidth
                        placeholder="Phone Number"
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {error && <Alert severity="error">{error}</Alert>}
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        onClick={addAddress}
                        style={{
                          backgroundColor: "#745D3E",
                          width: "100%",
                          color: "#ffffff",
                        }}
                      >
                        Add shipping address
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
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
                <CartSummary cartData={cartData} addressId={shippingAddId} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
