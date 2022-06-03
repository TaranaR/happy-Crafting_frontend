import { Fragment, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import {
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Button,
  Box,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Divider, makeStyles } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useTheme } from "@mui/material/styles";
import { ADD_REVIEW_FOR_PRODUCT_RESET } from "../constants/userConstants";

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

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    marginTop: "3%",
    // border: "1px solid black",
  },
  modelWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 5,
    width: "40%",
    maxHeight: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "70%",
      width: "70%",
    },
    [theme.breakpoints.down("md")]: {
      height: "70%",
      width: "70%",
    },
    backgroundColor: "white",
    boxShadow: 24,
    p: 4,
  },
}));

export default function TrackOrder(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const editorRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const orderId = props.orderId;
  const [prodId, setProdId] = useState("");
  const [body, setBody] = useState("");
  const [rate, setRate] = useState();

  const userAddReviewForProduct = useSelector(
    (state) => state.userAddReviewForProduct
  );
  const { reviewInfo } = userAddReviewForProduct;

  useEffect(() => {
    setActiveStep(0);
    setProduct([]);

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
    props.orderDetailsData.map((item) => {
      if (item[orderId]) {
        const { productDetails } = item[orderId];
        productDetails.map((i) => {
          setProduct((prevState) => [...prevState, i]);
        });
      }
    });
  }, [props.orderId]);

  const handleOpen = () => {
    dispatch({ type: ADD_REVIEW_FOR_PRODUCT_RESET });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addReview = () => {
    const review = {
      product: prodId,
      body: body,
      rate: rate,
    };
    props.onAddReview(review);

    setTimeout(handleClose, 3000);
  };

  return (
    <Fragment>
      <Container className={classes.root}>
        <Modal open={open} onClose={handleClose}>
          <Box className={classes.modelWrapper}>
            <Grid
              container
              spacing={2}
              sx={{
                padding: 5,
                [theme.breakpoints.down("md")]: { padding: 3 },
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  textAlign: "center",
                  fontSize: 25,
                  [theme.breakpoints.down("md")]: {
                    fontSize: 20,
                  },
                }}
              >
                Review Product
              </Grid>
              <Grid item xs={12} style={{ marginTop: 10 }}>
                <Select
                  fullWidth
                  placeholder="Select Product"
                  size="small"
                  displayEmpty
                  value={prodId}
                  onChange={(e) => {
                    setProdId(e.target.value);
                  }}
                >
                  <MenuItem value="">
                    <em>Select Product</em>
                  </MenuItem>
                  {product &&
                    product.map((item, index) => {
                      return (
                        <MenuItem value={item.id} key={index}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Editor
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  onChange={() => {
                    setBody(editorRef.current.getContent());
                  }}
                  init={{
                    height: 200,
                    menubar: false,
                    placeholder: "Your Description goes here.",
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "preview",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | link image " +
                      "removeformat",
                    content_style:
                      "body { font-family:roboto; font-size:14px }",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <IconButton
                  style={{ color: rate === 1 && "#2076D2" }}
                  onClick={() => {
                    setRate(1);
                  }}
                >
                  <ThumbUpIcon />
                </IconButton>
                <IconButton
                  style={{ color: rate === 0 && "#2076D2" }}
                  onClick={() => {
                    setRate(0);
                  }}
                >
                  <ThumbDownIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button
                  style={{
                    backgroundColor: "#000000",
                    color: "#ffffff",
                    marginLeft: "10px",
                    width: "60%",
                  }}
                  onClick={addReview}
                >
                  Confirm
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  textAlign: "center",
                  color: "green",
                  fontSize: 18,
                }}
              >
                {reviewInfo && reviewInfo}
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <Grid containerspacing={3}>
          <Grid item xs={12} style={{ fontSize: 20, textAlign: "center" }}>
            Track Order
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
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
            <>
              <Grid
                item
                xs={12}
                style={{ fontFamily: ["Lora", "serif"].join(",") }}
              >
                Thanks for shopping at HappyCrafting.
                <Button
                  style={{
                    color: "inherit",
                    textDecoration: "underline",
                    fontSize: 12,
                  }}
                  onClick={handleOpen}
                >
                  Review Products
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Fragment>
  );
}
