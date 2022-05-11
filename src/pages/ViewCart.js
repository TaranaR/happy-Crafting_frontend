import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { getCartDataByUser } from "../redux/actions/userAction";
import { Container, Divider, Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    marginTop: "3%",
    border: "1px solid black",
  },
}));

export default function ViewCart() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const userGetCartDataByUser = useSelector(
    (state) => state.userGetCartDataByUser
  );
  const { cartData } = userGetCartDataByUser;

  console.log(cartData);

  useEffect(() => {
    dispatch(getCartDataByUser());
  }, [dispatch]);
  return (
    <Fragment>
      <Container className={classes.root}>
        <Grid container>
          <Grid item xs={12} style={{ fontSize: 30 }}>
            My Cart
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
