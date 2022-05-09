import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./pages/global/Header";
import Home from "./pages/Home";
import { makeStyles } from "@material-ui/core/styles";
import LoginSignup from "./pages/LoginSignUp/LoginSignup";
import { useDispatch, useSelector } from "react-redux";
import backImg from "./Images/BackgroundApp.jpeg";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./pages/global/Footer";
import Profile from "./pages/UserProfile/Profile";
import MyAccount from "./pages/UserProfile/MyAccount";
import CreateShop from "./pages/CreateShop/CreateShop";
import MyShop from "./pages/CreateShop/MyShop";
import SellerProfile from "./pages/SellerProfile/SellerProfile";
import { useEffect } from "react";
import { getAdminDetail } from "./redux/actions/adminAction";
import { getMainCategory } from "./redux/actions/sellerAction";
import AdminHome from "./pages/Admin/AdminHome";
import AdminHeader from "./pages/Admin/global/AdminHeader";
import ManageSeller from "./pages/Admin/ManageSeller";
import ManageUser from "./pages/Admin/ManageUser";
import ManageCategory from "./pages/Admin/ManageCategory";
import ManageSubCategory from "./pages/Admin/ManageSubCategory";
import ProductDetails from "./pages/ProductDetails";
import AllProductsByCategory from "./pages/AllProductsByType";
import ProductCategoryPage from "./pages/ProductCategoryPage";

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
  const dispatch = useDispatch();
  let sections = [{ title: "Home", url: "/" }];
  const sellerGetMainCategory = useSelector(
    (state) => state.sellerGetMainCategory
  );
  const { mainCatInfo } = sellerGetMainCategory;
  const classes = useStyles();

  const userProfileInfo = useSelector((state) => state.userProfile);
  const adminDetail = useSelector((state) => state.adminDetail);
  const { admin, error } = adminDetail;
  const { user } = userProfileInfo;
  //const { token } = userLogin;
  const token = JSON.parse(localStorage.getItem("userInfo"));

  // const sections = [
  //   { title: "Home", url: "/" },
  //   { title: "Wall Art", url: "" },
  //   { title: "House Decor", url: "" },
  //   { title: "Furniture", url: "" },
  //   { title: "Bed & Bath", url: "" },
  //   { title: "Fashion", url: "" },
  // ];

  const adminSections = [
    { title: "Home", url: "/" },
    { title: "Manage Sellers", url: "/manageseller" },
    { title: "Manage Users", url: "/manageuser" },
    { title: "Manage Category", url: "/managecategory" },
    { title: "Manage Sub Category", url: "/managesubcategory" },
  ];

  if (mainCatInfo) {
    mainCatInfo.map((item) => {
      return sections.push({
        title: item.main_cat_name,
        url: item.main_cat_name.replace(/ /g, ""),
      });
    });
  }

  //console.log(sections);

  useEffect(() => {
    //dispatch(getAdminDetail());
    dispatch(getMainCategory());
    if (token) {
      dispatch(getAdminDetail());
      //console.log(admin);
    }
  }, [dispatch]);

  // console.log(user);
  // if (admin) {
  //   console.log(admin);
  // }
  // if (error) {
  //   console.log(error);
  // }
  //  const { token } = userLogin;

  // console.log(token.access);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {(error && !!admin) ||
                (admin && !admin.isAdmin && (
                  <>
                    <Header title="Happy Crafting" sections={sections} />
                    <Home sections={sections} />
                    <Footer />
                  </>
                ))}
              {admin && admin.isAdmin && (
                <>
                  <AdminHeader
                    title="Happy Crafting"
                    sections={adminSections}
                  />
                  <AdminHome />
                </>
              )}
            </>
          }
        />
        <Route
          path="/products/:prodId"
          element={
            <>
              <Header title="Happy Crafting" sections={sections} />
              <ProductDetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/WallArt"
          element={
            <>
              <Header title="Happy Crafting" sections={sections} />
              <ProductCategoryPage cat={"Wall Art"} />
              <Footer />
            </>
          }
        />
        <Route
          path="/manageseller"
          element={
            <>
              {(error && !!admin) ||
                (admin && !admin.isAdmin && (
                  <>
                    <Header title="Happy Crafting" sections={sections} />
                    <Home />
                    <Footer />
                  </>
                ))}
              {admin && admin.isAdmin && (
                <>
                  <AdminHeader
                    title="Happy Crafting"
                    sections={adminSections}
                  />
                  <ManageSeller />
                </>
              )}
            </>
          }
        />
        <Route
          path="/manageuser"
          element={
            <>
              {(error && !!admin) ||
                (admin && !admin.isAdmin && (
                  <>
                    <Header title="Happy Crafting" sections={sections} />
                    <Home />
                    <Footer />
                  </>
                ))}
              {admin && admin.isAdmin && (
                <>
                  <AdminHeader
                    title="Happy Crafting"
                    sections={adminSections}
                  />
                  <ManageUser />
                </>
              )}
            </>
          }
        />
        <Route
          path="/managecategory"
          element={
            <>
              {(error && !!admin) ||
                (admin && !admin.isAdmin && (
                  <>
                    <Header title="Happy Crafting" sections={sections} />
                    <Home />
                    <Footer />
                  </>
                ))}
              {admin && admin.isAdmin && (
                <>
                  <AdminHeader
                    title="Happy Crafting"
                    sections={adminSections}
                  />
                  <ManageCategory />
                </>
              )}
            </>
          }
        />
        <Route
          path="/managesubcategory"
          element={
            <>
              {(error && !!admin) ||
                (admin && !admin.isAdmin && (
                  <>
                    <Header title="Happy Crafting" sections={sections} />
                    <Home />
                    <Footer />
                  </>
                ))}
              {admin && admin.isAdmin && (
                <>
                  <AdminHeader
                    title="Happy Crafting"
                    sections={adminSections}
                  />
                  <ManageSubCategory />
                </>
              )}
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

// {(error && !!admin) ||
//   (admin && !admin.isAdmin && (
//     <>
//       <Header title="Happy Crafting" sections={sections} />
//       <Home />
//       <Footer />
//     </>
//   ))}
