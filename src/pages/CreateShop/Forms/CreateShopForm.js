import { Fragment, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { v4 } from "uuid";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Container,
  Button,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import { TextField } from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../constants/firebase";
import { createSellerShop } from "../../../redux/actions/sellerAction";

export default function CreateShopForm(props) {
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);

  const editorRef = useRef(null);

  const sellerCreateShopInfo = useSelector((state) => state.sellerCreateShop);

  const { loading, shopInfo, error } = sellerCreateShopInfo;

  const username = localStorage.getItem("username");

  //Create Shop
  const [shopName, setShopName] = useState("");
  const [shopLogo, setShopLogo] = useState("");
  const [shopDescription, setShopDescription] = useState("");
  const [shopLocation, setShopLocation] = useState("");
  let fileExtension = "";

  const imageUploadHandler = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const uploadShopLogohandler = () => {
    //Image Upload
    console.log(selectedFile);

    if (selectedFile === "" || shopName === "") return;
    if (shopInfo) return;

    const imageRef = ref(
      storage,
      `images/${username}/${v4()}.${fileExtension}`
    );

    if (!shopLogo) {
      uploadBytes(imageRef, selectedFile).then(() => {
        setSnackOpen(true);
        getDownloadURL(imageRef).then((url) => {
          setShopLogo(url);
        });
      });
    }
  };

  if (selectedFile) {
    let type = selectedFile.name.split(".");
    fileExtension = type[type.length - 1];
  }

  const submitHandler = () => {
    //create shop
    if (shopName === "" || shopDescription === "" || shopLocation === "")
      return;

    const shop = {
      shop_name: shopName,
      shop_logo: shopLogo,
      description: shopDescription,
      location: shopLocation,
    };

    dispatch(createSellerShop(shop));
  };

  return (
    <Fragment>
      <Container className={props.classes.formWrapper}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={3}
            style={{ padding: "15px" }}
            display={{ xs: "none", lg: "block", md: "block" }}
          >
            Shop Name
          </Grid>
          <Grid item xs={12} lg={9} md={9}>
            <TextField
              placeholder="Shop Name"
              fullWidth
              size="small"
              onChange={(e) => {
                setShopName(e.target.value);
              }}
            />
          </Grid>
          <Grid
            item
            xs={3}
            style={{ padding: "15px" }}
            display={{ xs: "none", lg: "block", md: "block" }}
          >
            Shop Logo
          </Grid>
          <Grid item xs={12} lg={9} md={9} style={{ textAlign: "left" }}>
            <label htmlFor="upload-photo">
              <input
                type="file"
                name="upload-photo"
                id="upload-photo"
                style={{ display: "none" }}
                onChange={imageUploadHandler}
                accept="image/*"
              />
              Select Image
              <label id="filename" style={{ marginLeft: "10px" }}>
                {selectedFile["name"]}
              </label>
            </label>
            <Button
              id="fileUpload"
              variant="contained"
              component="span"
              style={{
                backgroundColor: "#745D3E",
                color: "#ffffff",
                marginLeft: "10px",
              }}
              onClick={uploadShopLogohandler}
            >
              Upload
            </Button>
          </Grid>
          <Grid
            item
            xs={3}
            style={{ padding: "15px" }}
            display={{ xs: "none", lg: "block", md: "block" }}
          >
            Describe your shop
          </Grid>
          <Grid item xs={12} lg={9} md={9}>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              onChange={() => {
                setShopDescription(editorRef.current.getContent());
              }}
              init={{
                height: 300,
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
            xs={3}
            style={{ padding: "15px" }}
            display={{ xs: "none", lg: "block", md: "block" }}
          >
            Location
          </Grid>
          <Grid item xs={12} lg={9} md={9}>
            <TextField
              fullWidth
              size="small"
              placeholder="Location"
              onChange={(e) => {
                setShopLocation(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ padding: "15px", marginTop: "6%" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#745D3E",
                color: "#ffffff",
                width: "150px",
                height: "30px",
              }}
              onClick={submitHandler}
            >
              Confirm
            </Button>
          </Grid>
          <Grid item xs={12}>
            {loading && "Loading...."}
            {shopInfo && shopInfo.message}
            {error && error}
          </Grid>
        </Grid>
        <Snackbar
          open={snackOpen}
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
