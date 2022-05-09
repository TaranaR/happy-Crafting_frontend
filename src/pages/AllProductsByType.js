import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductByCategory } from "../redux/actions/userAction";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "5%",
    backgroundColor: "red",
  },
}));

export default function AllProductsByType(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const userGetAllRandomProductByCategory = useSelector(
  //   (state) => state.userGetAllRandomProductByCategory
  // );
  // const { prodCat } = userGetAllRandomProductByCategory;

  // useEffect(() => {
  //   dispatch(getAllProductByCategory(props.cat));
  // }, [dispatch]);

  // if (prodCat) {
  //   console.log(prodCat);
  // }
  return (
    <Fragment>
      <Box className={classes.root}>oweihf woigh</Box>
    </Fragment>
  );
}
