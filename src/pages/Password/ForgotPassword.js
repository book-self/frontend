import { Link as RouterLink } from "react-router-dom";
import { Grid, Link, Paper, Typography } from '@material-ui/core';
import { ForgotPasswordForm } from '../../components/ForgotPasswordForm/ForgotPasswordForm'
import { useStyles } from './ForgotPasswordStyles';

export const ForgotPassword = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container} direction="column" justify="center" alignItems="center">
      <Grid item className={classes.formContainer}>
          <Paper className={classes.form} elevation={0}>
            <Typography className={classes.title} component="h5" variant="h5" align="center">
              Forgot Password
            </Typography>

            <ForgotPasswordForm />

            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to="/signin" variant="body2">
                  Sign In
                </Link>
              </Grid>

              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Paper>
      </Grid>
    </Grid>
  );
}
