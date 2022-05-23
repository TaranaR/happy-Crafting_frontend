import { Fragment, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Paper,
} from "@mui/material";
import { Divider, makeStyles } from "@material-ui/core";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "Dispatching Soon",
  },
  {
    label: "Dispatched",
  },
  {
    label: "Delivered",
  },
];

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
    marginTop: "3%",
    // border: "1px solid black",
  },
}));

export default function TrackOrder(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  console.log(props.orderMasterData);

  useEffect(() => {
    setActiveStep(0);
    props.orderMasterData.map((item) => {
      if (item.id === props.orderId) {
        if (item.isDispatched) {
          setActiveStep(2);
        }
        if (item.isDispatched && item.isDelivered) {
          setActiveStep(3);
        }
      }
    });
  }, [props.orderId]);

  return (
    <Fragment>
      <Container className={classes.root}>
        <Grid containerspacing={3}>
          <Grid item xs={12} style={{ fontSize: 20, textAlign: "center" }}>
            Track Order
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {/* <Grid item xs={12} style={{ marginTop: "5%" }}>
            Track your Order with order id {props.orderId}.
          </Grid> */}
          <Grid item xs={12} style={{ padding: 30 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => {
                return (
                  <Step
                    key={step.label}
                    sx={{
                      "& .MuiStepLabel-root .Mui-active": {
                        color: "#F1960D",
                      },
                      "& .MuiStepLabel-root .Mui-completed": {
                        color: "green", // circle color (COMPLETED)
                      },
                      "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                        {
                          color: "#C4AF92", // Just text label (COMPLETED)
                        },
                    }}
                  >
                    <StepLabel>{step.label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Grid>
          {activeStep === steps.length && (
            <Grid
              item
              xs={12}
              style={{ fontFamily: ["Lora", "serif"].join(",") }}
            >
              Thanks for shopping at HappyCrafting.
            </Grid>
          )}
        </Grid>
      </Container>
    </Fragment>
  );
}
