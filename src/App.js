import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./pages/global/Header";
import Home from "./pages/Home";
import { makeStyles } from "@material-ui/core/styles";
import LoginSignup from "./pages/LoginSignUp/LoginSignup";
import { useDispatch, useSelector } from "react-redux";
import backImg from "./Images/BackgroundApp.jpeg";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./pages/global/Footer";
import Profile from "./pages/Profile";
import MyAccount from "./pages/MyAccount";
import CreateShop from "./pages/CreateShop/CreateShop";
import MyShop from "./pages/CreateShop/MyShop";
import SellerProfile from "./pages/SellerProfile/SellerProfile";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    background: "none",
    // backgroundImage: `url(${backImg})`,
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "cover",
    backgroundColor: "#F8F9FB",
    fontFamily: ["El Messiri", "sans-serif"].join(","),
  },
}));

function App() {
  const classes = useStyles();
  const sections = [
    { title: "Home", url: "/" },
    { title: "Wall Art", url: "" },
    { title: "House Decor", url: "" },
    { title: "Furniture", url: "" },
    { title: "Bed & Bath", url: "" },
    { title: "Fashion", url: "" },
  ];

  const userLogin = useSelector((state) => state.userLogin);
  const userProfileInfo = useSelector((state) => state.userProfile);
  const { user } = userProfileInfo;

  console.log(user);
  //const { token } = userLogin;

  const token = JSON.parse(localStorage.getItem("userInfo"));

  console.log(token.access);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header title="Happy Crafting" sections={sections} />
              <Home />
              <Footer />
            </>
          }
        />

        <Route
          path="/login"
          element={
            (!token && <LoginSignup isLoginPage="login" />) ||
            (token && <Navigate to="/" />)
          }
        />
        <Route
          path="/signup"
          element={
            (!token && <LoginSignup isLoginPage="signup" />) ||
            (token && <Navigate to="/" />)
          }
        />
        <Route
          path="/profile"
          element={
            (token && (
              <>
                <Header title="Happy Crafting" sections={sections} />
                {user.is_seller ? <SellerProfile /> : <Profile />}
                <Footer />
              </>
            )) ||
            (!token && <Navigate to="/" />)
          }
        />

        {/* <Route
          path="/sellerprofile"
          element={
            (token && (
              <>
                <Header title="Happy Crafting" sections={sections} />
                <SellerProfile />
                <Footer />
              </>
            )) ||
            (!token && <Navigate to="/" />)
          }
        /> */}

        <Route
          path="/myaccount"
          element={
            (token && (
              <>
                <Header title="Happy Crafting" sections={sections} />
                <MyAccount />
                <Footer />
              </>
            )) ||
            (!token && <Navigate to="/" />)
          }
        />

        <Route
          path="/myshop"
          element={
            (token && (
              <>
                <Header title="Happy Crafting" sections={sections} />
                <MyShop />
                <Footer />
              </>
            )) ||
            (!token && <Navigate to="/" />)
          }
        >
          <Route
            path="createshop"
            element={
              (token && <CreateShop />) || (!token && <Navigate to="/" />)
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
