import { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getSubCategoryByMainCategoryName } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
}));

export default function ProductCategoryPage(props) {
  const dispatch = useDispatch();
  const userGetSubCatgoryByMainCategoryName = useSelector(
    (state) => state.userGetSubCatgoryByMainCategoryName
  );
  const { subCatInfo } = userGetSubCatgoryByMainCategoryName;

  useEffect(() => {
    dispatch(getSubCategoryByMainCategoryName(props.cat));
  }, [dispatch]);

  if (subCatInfo) {
    console.log(subCatInfo);
  }

  return (
    <Fragment>
      <Box>{props.cat}</Box>
    </Fragment>
  );
}
