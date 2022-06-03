import { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Divider,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { getAllRandomProducts } from "../redux/actions/userAction";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "5%",
    justifyContent: "center",
  },
}));

export default function DiscoverMore() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const userGetAllRandomProducts = useSelector(
    (state) => state.userGetAllRandomProducts
  );

  const { allProducts } = userGetAllRandomProducts;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    dispatch(getAllRandomProducts());
  }, []);

  return (
    <Fragment>
      <Container className={classes.root}>
        <Grid container>
          <Grid item xs={12} style={{ fontSize: 30 }}>
            Discover
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        <ImageList
          sx={{ width: "100%", height: "50%", marginTop: "5%" }}
          variant="masonry"
          cols={4}
          gap={12}
        >
          {allProducts &&
            allProducts.map((item) => (
              <ImageListItem
                key={item.image}
                style={{
                  padding: 10,
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                }}
              >
                <NavLink to={`/products/${item.id}`}>
                  <img
                    src={`${item.image}`}
                    alt={item.name}
                    style={{ height: "100%", width: "100%" }}
                    loading="lazy"
                  />
                </NavLink>
                <ImageListItemBar title={item.name} position="below" />
              </ImageListItem>
            ))}
        </ImageList>
      </Container>
    </Fragment>
  );
}
