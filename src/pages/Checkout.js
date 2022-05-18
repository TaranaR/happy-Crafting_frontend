import {
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
import ErrorIcon from "@mui/icons-material/Error";
import {
  GET_CART_DATA_BY_USER_RESET,
  GET_SHIPPING_ADDRESS_BY_USER_RESET,
} from "../constants/userConstants";
import {
  getShippingAddressByUser,
  addShippingAddress,
} from "../redux/actions/userAction";
import ViewCart from "./ViewCart";
import CartSummary from "../components/CartSummary";
import { useTheme } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
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
}));

export default function Checkout() {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();

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

  const { address } = userGetShippingAddressByUser;
  const { cartData } = userGetCartDataByUser;
  const { addressData } = userAddShippingAddress;

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

  const addAddress = () => {
    if (title === "") {
      setError("Select Title");
      return;
    }
    const add = {
      title: title,
      first_name: firstName,
      last_name: lastName,
      address: shipAdd,
      city: city,
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

  return (
    <Fragment>
      <Container className={classes.root}>
        <Grid container>
          <Grid item xs={12} style={{ fontSize: 30 }}>
            Checkout
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container style={{ marginTop: "2%", margin: "10px" }}>
            <Grid item xs={12} lg={8} md={8}>
              <Grid item xs={12}>
                Select from existing address
              </Grid>
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
              <Grid item xs={12} style={{ marginTop: 30 }}>
                <Divider />
              </Grid>
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
                      {/* {error && (
                        <>
                          <ErrorIcon /> {error}
                        </>
                      )} */}
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
                        required
                        fullWidth
                        placeholder="Pincode"
                        onChange={(e) => {
                          setPinCode(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        value={phone}
                        required
                        fullWidth
                        placeholder="Phone Number"
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
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
                <CartSummary cartData={cartData} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
