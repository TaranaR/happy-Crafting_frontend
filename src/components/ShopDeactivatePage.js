import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@mui/material";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: "100vh",
    marginTop: "20%",
  },
}));

export default function ShopDeactivatePage() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12} style={{ fontFamily: ["Lora", "serif"].join(",") }}>
          Your shop has been deactivated.
        </Grid>
        <Grid item xs={12} style={{ fontFamily: ["Lora", "serif"].join(",") }}>
          For more information contact authority on happycrafting@yopmail.com
        </Grid>
      </Grid>
    </Container>
  );
}
