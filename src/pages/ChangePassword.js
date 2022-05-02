import { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, TextField } from "@mui/material";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: "13%",
  },
}));

export default function ChangePassword(props) {
  return (
    <Fragment>
      <Container classes={props.classes.formWrapper}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            Old Password
          </Grid>
          <Grid item xs={9}>
            <TextField size="small" fullWidth />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}
