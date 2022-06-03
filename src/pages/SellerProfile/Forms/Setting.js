import { Fragment, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { v4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@mui/material/Avatar";
import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../constants/firebase";
import {
  deactivateShop,
  getSellerProfile,
  updateSellerProfile,
} from "../../../redux/actions/sellerAction";
import { SELLER_UPDATE_PROFILE_RESET } from "../../../constants/sellerConstants";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "13%",
    [theme.breakpoints.down("md")]: {
      marginTop: "10%",
      textAlign: "left",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "10%",
      textAlign: "center",
    },
  },
  deactivateBtn: {
    "&.MuiButton-root": {
      backgroundColor: "#940011",
      width: "250px",
      color: "#ffffff",
      "&:hover": {
        color: "#D2042D",
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
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    maxHeight: "95%",
    backgroundColor: "white",
    boxShadow: 24,
    p: 4,
  },
}));

export default function Setting(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const editorRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [imgSnackOpen, setImgSnackOpen] = useState(false);

  const [shopName, setShopName] = useState("");
  const [shopLogo, setShopLogo] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [shopLocation, setShopLocation] = useState("");

  const userProfileInfo = useSelector((state) => state.userProfile);
  const sellerUpdateProfile = useSelector((state) => state.sellerUpdateProfile);

  const { user } = userProfileInfo;
  const { success, sellerInfo } = sellerUpdateProfile;
  let fileExtension = "";

  const username = user.username;

  useEffect(() => {
    if (!props.seller || success) {
      dispatch({ type: SELLER_UPDATE_PROFILE_RESET });
      dispatch(getSellerProfile());
    } else {
      setShopName(props.seller.shop_name);
      setShopLogo(props.seller.shop_logo);
      setShopDescription(props.seller.description);
      setShopLocation(props.seller.location);
    }
  }, [dispatch, props.seller, success]);

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
    setImgSnackOpen(false);
  };

  const submitHandler = () => {
    setSnackOpen(true);
    if (shopName === "" || shopDescription === "" || shopLocation === "")
      return;

    const shop = {
      shop_name: shopName,
      shop_logo: shopLogo,
      description: shopDescription,
      location: shopLocation,
    };

    dispatch(updateSellerProfile(shop));
    dispatch({ type: SELLER_UPDATE_PROFILE_RESET });
    dispatch(getSellerProfile());
  };

  const imageUploadHandler = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  if (sellerInfo) {
    console.log(sellerInfo);
  }

  const uploadShopLogohandler = () => {
    //Image Upload
    console.log(selectedFile);

    if (selectedFile === "") return;

    const imageRef = ref(
      storage,
      `images/${username}/${v4()}.${fileExtension}`
    );

    uploadBytes(imageRef, selectedFile).then(() => {
      setImgSnackOpen(true);
      getDownloadURL(imageRef).then((url) => {
        setShopLogo(url);
      });
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const deactivateShopHandler = () => {
    dispatch(deactivateShop());
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure, you want to deactivate your shop?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By deactivating shop you won't be able to sell your products
            anymore.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={deactivateShopHandler} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Container className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} style={{ fontSize: 20 }}>
            Setting
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid container style={{ margin: "20px", textAlign: "center" }}>
            <Grid item xs={12} lg={3} md={3} style={{ padding: "15px" }}>
              Shop Name
            </Grid>
            <Grid
              item
              xs={12}
              lg={9}
              md={9}
              sx={{
                textAlign: "left",
                [theme.breakpoints.down("md")]: {
                  textAlign: "center",
                },
              }}
            >
              <TextField
                size="small"
                sx={{
                  width: "50vh",
                  [theme.breakpoints.down("md")]: {
                    width: "80%",
                  },
                }}
                value={shopName}
                onChange={(e) => {
                  setShopName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} lg={3} md={3} style={{ padding: "15px" }}>
              Shop Logo
            </Grid>

            <Grid item xs={1} lg={1} md={1}>
              <Avatar
                src={props.seller.shop_logo}
                style={{
                  border: "1px solid #D6DCD2",
                  borderRadius: 5,
                  transform: "scale(1.5)",
                  marginLeft: "1vh",
                  marginTop: "1vh",
                  position: "absolute",
                }}
                variant="square"
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={8}
              md={8}
              style={{
                textAlign: "left",
                [theme.breakpoints.down("md")]: {
                  textAlign: "center",
                },
              }}
            >
              <label htmlFor="upload-photo">
                <input
                  type="file"
                  name="upload-photo"
                  id="upload-photo"
                  style={{ display: "none", marginTop: "10px" }}
                  accept="image/*"
                  onChange={imageUploadHandler.bind(this)}
                />
                Change Logo
              </label>
              <Button
                id="fileUpload"
                variant="contained"
                component="span"
                style={{
                  backgroundColor: "#745D3E",
                  color: "#ffffff",
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
                onClick={uploadShopLogohandler}
              >
                Upload
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              lg={3}
              md={3}
              style={{ padding: "15px", marginTop: "12px" }}
            >
              Shop Description
            </Grid>
            <Grid
              item
              xs={12}
              lg={9}
              md={9}
              sx={{
                textAlign: "left",
                marginTop: "12px",
                [theme.breakpoints.down("md")]: {
                  textAlign: "center",
                },
              }}
            >
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={props.seller && shopDescription}
                onChange={() => {
                  setShopDescription(editorRef.current.getContent());
                }}
                init={{
                  height: 300,
                  width: "90%",
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
                  content_style: "body { font-family:roboto; font-size:14px }",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={3}
              md={3}
              style={{ padding: "15px", marginTop: "10px" }}
            >
              Shop Location
            </Grid>
            <Grid
              item
              xs={12}
              lg={9}
              md={9}
              style={{ textAlign: "left", marginTop: "10px" }}
            >
              <TextField
                size="small"
                style={{ width: "50vh" }}
                value={shopLocation}
                onChange={(e) => {
                  setShopLocation(e.target.value);
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                padding: "15px",
                marginTop: "4%",
                textAlign: "left",
                textAlign: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "#745D3E",
                  color: "#ffffff",
                  width: "180px",
                }}
                onClick={submitHandler}
              >
                update
              </Button>
            </Grid>
          </Grid>
          {sellerInfo && (
            <Snackbar
              open={snackOpen}
              autoHideDuration={6000}
              onClose={handleSnackClose}
            >
              <Alert
                onClose={handleSnackClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                <AlertTitle>Success</AlertTitle>
                {sellerInfo.message}
              </Alert>
            </Snackbar>
          )}
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ fontSize: 20 }}>
            Deactivate Shop
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid
            container
            style={{
              margin: "20px",
            }}
          >
            <Grid xs={12}>
              <Button className={classes.deactivateBtn} onClick={handleOpen}>
                Deactivate Shop
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar
          open={imgSnackOpen}
          autoHideDuration={1000}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            <AlertTitle>Success</AlertTitle>Image Uploaded
          </Alert>
        </Snackbar>
      </Container>
    </Fragment>
  );
}
