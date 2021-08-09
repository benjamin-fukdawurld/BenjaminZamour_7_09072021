import { Theme } from "@material-ui/core/styles/createTheme";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textTransform: "none",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(1),
  },

  login: { marginLeft: theme.spacing(1) },
}));

export { useStyles };
