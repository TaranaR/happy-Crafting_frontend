import { Fragment, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { getRandomProductByCategory } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { GET_RANDOM_PRODUCT_BY_CATEGORY_RESET } from "../constants/userConstants";

const useStyles = makeStyles(() => ({
  nameLink: {
    textDecoration: "none",
    position: "relative",
    color: "#733C3C",
    "&:hover": {
      color: "#000000",
      border: "1",
    },
    "&:before": {
      content: "''",
      position: "absolute",
      width: "0",
      height: "5px",
      bottom: "-1px",
      left: "50%",
      transform: "translate(-50%,0%)",
      backgroundColor: "#1C658C",
      visibility: "hidden",
      transition: "all 0.3s ease-in-out",
    },
    "&:hover:before": {
      visibility: "visible",
      width: "100%",
    },
  },
  imgLink: {
    tDecoration: "none",
    position: "relative",
    color: "#733C3C",
    "&:hover": {
      color: "#000000",
      border: "1",
    },
    "&:before": {
      content: "''",
      position: "absolute",
      width: "0",
      height: "5px",
      bottom: "-25px",
      left: "50%",
      transform: "translate(-50%,0%)",
      backgroundColor: "#1C658C",
      visibility: "hidden",
      transition: "all 0.3s ease-in-out",
    },
    "&:hover:before": {
      visibility: "visible",
      width: "100%",
    },
  },
}));

export default function ProductByCategory(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getRandomProductByCategory(props.cat));
  }, [dispatch]);

  const userGetRandomProductByCategory = useSelector(
    (state) => state.userGetRandomProductByCategory
  );

  let linkname = props.cat.replace(/ /g, "");
  const { randProdCat } = userGetRandomProductByCategory;

  return (
    <Fragment>
      <Grid
        container
        justifyItems="center"
        spacing={2}
        style={{
          width: "80%",
          marginLeft: "12%",
          marginRight: "10%",
          marginTop: 0,
        }}
      >
        {randProdCat &&
          Object.values(randProdCat).map((item) => {
            return (
              item[props.cat] &&
              Object.values(item[props.cat]).map((i) => {
                return (
                  <Grid
                    key={i.id}
                    item
                    xs={4}
                    style={{
                      marginTop: "1%",
                      //padding: "10px",
                    }}
                  >
                    <Grid item xs={12}>
                      <NavLink
                        to={`/products/${i.id}`}
                        className={classes.imgLink}
                      >
                        <img
                          src={i.image}
                          style={{
                            height: "20vh",
                            width: "20vh",
                            // border: "5px solid #534340",
                            borderRadius: 10,
                          }}
                        />
                      </NavLink>
                    </Grid>

                    <Grid item xs={12}>
                      <NavLink
                        to={`/products/${i.id}`}
                        className={classes.nameLink}
                      >
                        {i.name}
                      </NavLink>
                    </Grid>
                  </Grid>
                );
              })
            );
          })}

        <Grid item xs={12} style={{ marginTop: "4%" }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#000000",
              width: "50%",
              marginBottom: "6%",
            }}
            onClick={() => {
              navigate(`/${linkname}`);
            }}
          >
            Explore More
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
}
