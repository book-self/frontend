import { Link as RouterLink } from "react-router-dom";
import { Container, Grid, Link, Paper, Typography } from '@material-ui/core';
import { SignInForm } from '../../components/SignInForm/SignInForm'
import { useStyles } from './SignInStyles';

export const SignIn = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container} direction="column" justify="center" alignItems="center">
      <Grid item>
        <Container maxWidth="sm" className={classes.formContainer}>
          <Paper className={classes.form} elevation={0}>
            <Typography className={classes.title} component="h5" variant="h5" align="center">
              Sign In
            </Typography>

            <SignInForm />

            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to="/forgot" variant="body2">
                  Forgot password?
                </Link>
              </Grid>

              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
}
