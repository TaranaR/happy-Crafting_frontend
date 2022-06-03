import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 } from "uuid";
import { HexColorPicker } from "react-colorful";
import { Grid, Container, Button, Snackbar, AlertTitle } from "@mui/material";
import { Alert } from "@mui/material";
import { TextField } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton";
import { storage } from "../../../constants/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getMainCategory,
  getSubCategory,
  createSellerProduct,
  updateSellerProduct,
} from "../../../redux/actions/sellerAction";
import { getProductDetails } from "../../../redux/actions/userAction";
import { GET_PRODUCT_DETAILS_RESET } from "../../../constants/userConstants";

export default function UploadProductsForm(props) {
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState("");
  const [errormsg, setErrormsg] = useState("");
  const sellerGetMainCategory = useSelector(
    (state) => state.sellerGetMainCategory
  );
  const sellerGetSubCategory = useSelector(
    (state) => state.sellerGetSubCategory
  );

  const userProfileInfo = useSelector((state) => state.userProfile);

  const sellerCreateProdInfo = useSelector(
    (state) => state.sellerCreateProduct
  );

  const { mainCatInfo } = sellerGetMainCategory;
  const { subCatInfo } = sellerGetSubCategory;

  const { loading, prodInfo } = sellerCreateProdInfo;

  const username = window.localStorage.getItem("username");

  //Create Product
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState("");
  const [prodMainCat, setProdMainCat] = useState("");
  const [prodSubCat, setProdSubCat] = useState("");

  const usergetProductDetails = useSelector(
    (state) => state.userGetProductDetails
  );
  const { prodInfo: prodDetail } = usergetProductDetails;

  const [prodDescription, setProdDescription] = useState("");
  const [prodImage, setProdImage] = useState("");
  const [prodSize, setProdSize] = useState("");
  const [prodColor, setProdColor] = useState("");
  const [isCustomizable, setIsCustomizable] = useState(false);

  const [snackOpen, setSnackOpen] = useState(false);

  let main = [];
  let sub = [];

  let fileExtension = "";

  useEffect(() => {
    setErrormsg("");
    dispatch({ type: GET_PRODUCT_DETAILS_RESET });
    dispatch(getMainCategory());
  }, []);

  useEffect(() => {
    dispatch({ type: GET_PRODUCT_DETAILS_RESET });
    if (props.prodId) {
      dispatch(getProductDetails(props.prodId));
    }
  }, []);

  useEffect(() => {
    if (prodInfo) {
      setErrormsg("");
    }
  }, [prodInfo]);

  useEffect(() => {
    if (prodDetail) {
      setProdName(prodDetail["name"]);
      setProdPrice(prodDetail["price"]);
      setProdSubCat(prodDetail["sub_cat_id"]);
      setProdDescription(prodDetail["description"]);
      setProdImage(prodDetail["image"]);
      setProdSize(prodDetail["size"]);
      setProdColor(prodDetail["color"]);
      setIsCustomizable(prodDetail["is_customizable"]);
    }
  }, [prodDetail]);

  if (mainCatInfo) {
    main = Object.values(mainCatInfo);
  }

  if (subCatInfo) {
    sub = Object.values(subCatInfo);
  }

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

    if (
      prodName === "" ||
      prodPrice === "" ||
      prodDescription === "" ||
      selectedFile === ""
    ) {
      return;
    }

    const imageRef = ref(
      storage,
      `images/${username}/${v4()}.${fileExtension}`
    );

    if (!prodImage) {
      uploadBytes(imageRef, selectedFile).then(() => {
        setSnackOpen(true);
        getDownloadURL(imageRef).then((url) => {
          setProdImage(url);
        });
      });
    }
  };

  if (selectedFile) {
    let t = selectedFile.name.split(".");
    fileExtension = t[t.length - 1];
  }

  const submitHandler = () => {
    //create shop

    if (props.prodId) {
      const product = {
        id: prodDetail["id"],
        sub_cat_id: prodSubCat,
        name: prodName,
        price: prodPrice,
        description: prodDescription,
        image: prodImage,
        size: prodSize,
        color: prodColor,
        is_customizable: isCustomizable,
      };
      dispatch(updateSellerProduct(product));
    } else {
      if (
        prodName === undefined ||
        prodPrice === undefined ||
        prodDescription === undefined ||
        prodSize === undefined
      ) {
        setErrormsg("Add all the fields");
        console.log(
          prodName,
          prodPrice,
          prodSubCat,
          prodDescription,
          prodSize,
          prodImage
        );
        return;
      } else {
        const product = {
          sub_cat_id: prodSubCat,
          name: prodName,
          price: prodPrice,
          description: prodDescription,
          image: prodImage,
          size: prodSize,
          color: prodColor,
          is_customizable: isCustomizable,
        };
        dispatch(createSellerProduct(product));
      }
    }

    props.onClose();
  };

  return (
    <Fragment>
      <Container className={props.classes.formWrapper}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={3}
            sx={{ padding: "15px" }}
            display={{ xs: "none", lg: "block", md: "block" }}
          >
            Name
          </Grid>
          <Grid item xs={12} lg={9} md={9}>
            <TextField
              size="small"
              placeholder="Product Name"
              fullWidth
              value={prodName}
              onChange={(e) => {
                setProdName(e.target.value);
              }}
            />
          </Grid>
          <Grid
            item
            xs={3}
            style={{ padding: "15px" }}
            display={{ xs: "none", lg: "block", md: "block" }}
          >
            Price
          </Grid>
          <Grid item xs={12} lg={9} md={9}>
            <TextField
              size="small"
              fullWidth
              placeholder="Product Price"
              type="number"
              value={prodPrice}
              onChange={(e) => {
                setProdPrice(e.target.value);
              }}
            />
          </Grid>
          <Grid
            item
            xs={3}
            style={{ padding: "15px" }}
            display={{ xs: "none", lg: "block", md: "block" }}
          >
            Type of Product
          </Grid>
          <Grid item xs={12} lg={9} md={9}>
            <Select
              value={prodMainCat}
              onChange={(e) => {
                console.log(e.target.value);
                setProdMainCat(e.target.value);
                dispatch(getSubCategory(e.target.value));
              }}
              fullWidth
              size="small"
              displayEmpty
              style={{ color: "#AAAAAA" }}
            >
              <MenuItem value="">
                <em>Select Category</em>
              </MenuItem>
              {main &&
                main.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.main_cat_name}
                  </MenuItem>
                ))}
            </Select>
            {subCatInfo && (
              <Select
                onChange={(e) => {
                  setProdSubCat(e.target.value);
                }}
                fullWidth
                size="small"
                displayEmpty
                style={{ marginTop: "10px", color: "#AAAAAA" }}
              >
                <MenuItem value="">
                  <em>Select Type</em>
                </MenuItem>
                {sub &&
                  sub.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.sub_cat_name}
                    </MenuItem>
                  ))}
              </Select>
            )}
          </Grid>
          <Grid
            item
            xs={3}
            style={{ padding: "15px" }}
            display={{ xs: "none", lg: "block", md: "block" }}
          >
            Description
          </Grid>
          <Grid item xs={12} lg={9} md={9}>
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              value={props.prodId && prodDescription}
              onChange={() => {
                setProdDescription(editorRef.current.getContent());
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
            Product Images
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
            Size
          </Grid>
          <Grid item xs={12} lg={9} md={9}>
            <TextField
              fullWidth
              size="small"
              placeholder="Product Size"
              multiline
              maxRows={5}
              value={prodSize}
              onChange={(e) => {
                setProdSize(e.target.value);
              }}
            />
          </Grid>
          <Grid
            item
            xs={3}
            style={{ padding: "15px" }}
            display={{ xs: "none", lg: "block", md: "block" }}
          >
            Color
          </Grid>
          <Grid item xs={12} lg={9} md={9}>
            <HexColorPicker
              color={prodColor ? prodColor : "#000000"}
              onChange={setProdColor}
              style={{ height: 100, width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} style={{ padding: "15px" }}>
            {!loading && (
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "#745D3E",
                  color: "#ffffff",
                  width: "150px",
                  height: "30px",
                }}
                onClick={submitHandler}
              >
                Confirm
              </Button>
            )}
            {loading && (
              <LoadingButton
                loading
                variant="contained"
                loadingPosition="start"
                style={{
                  backgroundColor: "#745D3E",
                  color: "#ffffff",
                  width: "150px",
                  height: "30px",
                }}
              >
                Confirm
              </LoadingButton>
            )}
          </Grid>
          {errormsg && (
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                color: "red",
                marginTop: 0,
                marginBottom: 10,
              }}
            >
              <Alert severity="error" style={{ width: "100%" }}>
                {errormsg}
              </Alert>
            </Grid>
          )}
          {prodInfo && (
            <Grid item xs={12}>
              {prodInfo.message}
            </Grid>
          )}
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
