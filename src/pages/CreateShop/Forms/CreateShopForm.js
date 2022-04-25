import { Fragment, useState } from "react";
import { Grid, Container, Button } from "@material-ui/core";
import { TextField } from "@mui/material";
import { createSellerShop } from "../../../redux/actions/sellerAction";

import { useSelector, useDispatch } from "react-redux";
import { storage } from "../../../constants/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function CreateShopForm(props) {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState("");
  const userProfileInfo = useSelector((state) => state.userProfile);
  const sellerCreateShopInfo = useSelector((state) => state.sellerCreateShop);

  const { user } = userProfileInfo;
  const { loading, shopInfo, error } = sellerCreateShopInfo;

  const username = user.username;

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

  const uploadShopLogohandler = () => {
    //Image Upload
    console.log(selectedFile);

    if (selectedFile === "") return;
    if (shopInfo) return;

    const imageRef = ref(
      storage,
      `images/${username}/${v4()}.${fileExtension}`
    );

    uploadBytes(imageRef, selectedFile).then(() => {
      alert("Image uploaded");
      getDownloadURL(imageRef).then((url) => {
        setShopLogo(url);
      });
    });
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
          <Grid item xs={3} style={{ padding: "15px" }}>
            Shop Name
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              size="small"
              onChange={(e) => {
                setShopName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={3} style={{ padding: "15px" }}>
            Shop Logo
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
            Describe your shop
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              size="small"
              multiline
              maxRows={5}
              onChange={(e) => {
                setShopDescription(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={3} style={{ padding: "15px" }}>
            Location
          </Grid>
          <Grid item xs={9}>
            <TextField
              fullWidth
              size="small"
              onChange={(e) => {
                setShopLocation(e.target.value);
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
            {shopInfo && shopInfo.message}
            {error && error}
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
