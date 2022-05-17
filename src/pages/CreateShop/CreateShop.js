import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Container, Button } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CreateShopForm from "./Forms/CreateShopForm";
import UploadProductsForm from "./Forms/UploadProductsForm";
import StartSellingForm from "./Forms/StartSellingForm";
import { useDispatch, useSelector } from "react-redux";
import { getCartDataByUser } from "../../redux/actions/userAction";

const steps = [
  "Create Shop",
  "Upload your best product to get started",
  "Start Selling",
];

export const Input = styled("input")({
  display: "none",
});

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    width: "100%",
    marginTop: "80px",
  },
  formWrapper: {
    textAlign: "center",
    marginTop: "100px",
    width: "70%",
    fontWeight: "bold",
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#3F3422",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3F3422",
      },
    },
  },
}));

export default function CreateShop() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);

  const sellerCreateShop = useSelector((state) => state.sellerCreateShop);
  const sellerCreateProduct = useSelector((state) => state.sellerCreateProduct);
  const { shopInfo } = sellerCreateShop;
  const { prodInfo } = sellerCreateProduct;

  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // console.log("Completed");
      navigate("/profile");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    dispatch(getCartDataByUser());
  }, [dispatch]);

  let content = "";

  if (activeStep === 0) {
    content = <CreateShopForm classes={classes} />;
  }
  if (activeStep === 1) {
    if (shopInfo) {
      content = <UploadProductsForm classes={classes} />;
    } else {
      setActiveStep(0);
    }
  }
  if (activeStep === 2) {
    if (prodInfo) {
      content = <StartSellingForm classes={classes} />;
    } else {
      setActiveStep(1);
    }
  }

  return (
    <Fragment>
      <Box className={classes.root}>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step
                key={label}
                sx={{
                  "& .MuiStepLabel-root .Mui-active": {
                    color: "#745D3E",
                  },
                  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                    {
                      color: "common.black",
                    },
                  "& .MuiStepLabel-root .Mui-completed": {
                    color: "#C4AF92", // circle color (COMPLETED)
                  },
                  "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                    {
                      color: "#C4AF92", // Just text label (COMPLETED)
                    },
                }}
              >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box>{content}</Box>
        <Container>
          <Box
            sx={{
              display: "flex",
              pt: 5,
              mt: "5vh",
              ml: "30vh",
              mr: "25vh",
            }}
          >
            {/* <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button> */}
            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              onClick={handleNext}
              variant="contained"
              component="span"
              style={{
                backgroundColor: "#745D3E",
                color: "#ffffff",
              }}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Container>
      </Box>
    </Fragment>
  );
}
