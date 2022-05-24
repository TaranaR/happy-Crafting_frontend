import { Box, Fab, Grid } from "@material-ui/core";
import { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    width: "100%",
  },
  typographyClass: {
    fontFamily: ["El Messiri", "sans-serif"].join(","),
  },
  stepWrapper: {
    textAlign: "center",
  },
  btnStart: {
    backgroundColor: "#ffffff",
  },
}));

export default function MyShop() {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  return (
    <Fragment>
      <Box className={classes.root}>
        <Box
          style={{
            height: "50vh",
            width: "100%",
            backgroundColor: "#D5C6B1",
            marginTop: "5vh",
          }}
        >
          <Grid container>
            <Grid
              item
              xs={12}
              style={{ textAlign: "center", padding: "20px", fontSize: 35 }}
            >
              How It Works
            </Grid>
            <Grid
              style={{
                height: "20vh",
              }}
              container
            >
              <Grid item xs={4} className={classes.stepWrapper}>
                <Box>
                  <Fab
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#ffffff",
                      color: "black",
                      borderRadius: 50,
                      fontWeight: "bold",
                    }}
                    disabled
                  >
                    1
                  </Fab>
                </Box>
                <Grid
                  style={{
                    marginTop: "30px",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Create Shop
                </Grid>
                <Grid style={{ marginTop: "10px", fontSize: 15 }}>
                  Create your account and start uploading products.
                </Grid>
              </Grid>
              <Grid item xs={4} className={classes.stepWrapper}>
                <Box>
                  <Fab
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#ffffff",
                      color: "black",
                      borderRadius: 50,
                      fontWeight: "bold",
                    }}
                    disabled
                  >
                    2
                  </Fab>
                </Box>
                <Grid
                  style={{
                    marginTop: "30px",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Upload Products
                </Grid>
                <Grid style={{ marginTop: "10px", fontSize: 15 }}>
                  Enable a best-in-class array of wall art, home decor,
                  furniture, apparel and lifestyle products.
                </Grid>
              </Grid>
              <Grid item xs={4} className={classes.stepWrapper}>
                <Box>
                  <Fab
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#ffffff",
                      color: "black",
                      borderRadius: 50,
                      fontWeight: "bold",
                    }}
                    disabled
                  >
                    3
                  </Fab>
                </Box>
                <Grid
                  style={{
                    marginTop: "30px",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Start Selling
                </Grid>
                <Grid style={{ marginTop: "10px", fontSize: 15 }}>
                  Start selling your products and see the earning you get.
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              style={{
                textAlign: "center",
                marginTop: "65px",
              }}
              xs={12}
            >
              <Button
                variant="contained"
                style={{
                  color: "black",
                  backgroundColor: "#ffffff",
                  borderRadius: 20,
                  width: "50vh",
                }}
                onClick={() => {
                  navigate("createshop");
                }}
              >
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Outlet />
      </Box>
    </Fragment>
  );
}
