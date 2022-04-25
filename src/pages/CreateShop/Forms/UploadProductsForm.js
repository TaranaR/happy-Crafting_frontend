import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Grid, Button, Checkbox } from "@material-ui/core";
import { TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import { withStyles } from "@material-ui/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { storage } from "../../../constants/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import {
  getTypeOfProducts,
  createSellerProduct,
} from "../../../redux/actions/sellerAction";

export default function UploadProductsForm(props) {
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState("");
  const getTypeOfProduct = useSelector((state) => state.sellerGetTypeOfProduct);
  const userProfileInfo = useSelector((state) => state.userProfile);

  const sellerCreateProdInfo = useSelector(
    (state) => state.sellerCreateProduct
  );

  const { user } = userProfileInfo;
  const { prodTypeInfo } = getTypeOfProduct;
  const { loading, prodInfo, error } = sellerCreateProdInfo;

  const username = user.username;

  //Create Product
  const [prodName, setProdName] = useState("");
  const [prodPrice, setProdPrice] = useState(0);
  const [prodType, setProdType] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [prodImage, setProdImage] = useState("");
  const [prodSize, setProdSize] = useState("");
  const [prodColor, setProdColor] = useState("");
  const [isCustomizable, setIsCustomizable] = useState(false);
  let type = [];
  let fileExtension = "";

  const checkBoxStyles = (theme) => ({
    root: {
      "&$checked": {
        color: "#745D3E",
      },
    },
    checked: {},
  });

  const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

  useEffect(() => {
    dispatch(getTypeOfProducts());
  }, []);

  if (prodTypeInfo) {
    type = Object.values(prodTypeInfo);
  }

  const imageUploadHandler = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadShopLogohandler = () => {
    //Image Upload
    console.log(selectedFile);

    if (selectedFile === "") return;
    if (prodInfo) return;

    const imageRef = ref(
      storage,
      `images/${username}/${v4()}.${fileExtension}`
    );

    uploadBytes(imageRef, selectedFile).then(() => {
      alert("Image uploaded");
      getDownloadURL(imageRef).then((url) => {
        setProdImage(url);
      });
    });
  };

  if (selectedFile) {
    let type = selectedFile.name.split(".");
    fileExtension = type[type.length - 1];
  }

  const submitHandler = () => {
    //create shop

    console.log("name", prodName);
    console.log("price", prodPrice);
    console.log("desciption", prodDescription);
    console.log("type", prodType);
    console.log("image", prodImage);
    console.log("size", prodSize);
    console.log("color", prodColor);
    console.log("isCust", isCustomizable);

    if (
      prodName === "" ||
      prodPrice === "" ||
      prodDescription === "" ||
      prodSize === "" ||
      prodColor === ""
    ) {
      console.log("hello");
      return;
    }

    const product = {
      type_cat_id: prodType,
      name: prodName,
      price: prodPrice,
      description: prodDescription,
      image: prodImage,
      size: prodSize,
      color: prodColor,
      is_customizable: isCustomizable,
    };

    dispatch(createSellerProduct(product));
  };

  return (
    <Fragment>
      <Container className={props.classes.formWrapper}>
        <Grid container spacing={2}>
          <Grid item xs={3} style={{ padding: "15px" }}>
            Name
          </Grid>
          <Grid item xs={9}>
            <TextField
              size="small"
              fullWidth
              onChange={(e) => {
                setProdName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={3} style={{ padding: "15px" }}>
            Price
          </Grid>
          <Grid item xs={9}>
            <TextField
              size="small"
              fullWidth
              type="number"
              onChange={(e) => {
                setProdPrice(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={3} style={{ padding: "15px" }}>
            Type of Product
          </Grid>
          <Grid item xs={9}>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={prodType}
              onChange={(e) => {
                setProdType(e.target.value);
              }}
              fullWidth
              size="small"
              displayEmpty
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {type &&
                type.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.title}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
          <Grid item xs={3} style={{ padding: "15px" }}>
            Description
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              size="small"
              multiline
              maxRows={5}
              onChange={(e) => {
                setProdDescription(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={3} style={{ padding: "15px" }}>
            Product Images
          </Grid>
          <Grid item xs={9} style={{ textAlign: "left" }}>
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
          <Grid item xs={3} style={{ padding: "15px" }}>
            Size
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              size="small"
              multiline
              maxRows={5}
              onChange={(e) => {
                setProdSize(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={3} style={{ padding: "15px" }}>
            Color
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              size="small"
              multiline
              maxRows={5}
              onChange={(e) => {
                setProdColor(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={3} style={{ padding: "15px" }}>
            Is Customizable
          </Grid>
          <Grid item xs={9} style={{ textAlign: "left", padding: "5px" }}>
            <CustomCheckbox
              onChange={(e) => {
                setIsCustomizable(e.target.checked);
              }}
            />
          </Grid>
          <Grid item xs={12} style={{ padding: "15px", marginTop: "6vh" }}>
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
          </Grid>
          <Grid item xs={12}>
            {loading && "Loading...."}
            {prodInfo && prodInfo.message}
            {error && error}
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
