import { Link as RouterLink } from "react-router-dom";
import { Container, Grid, Link, Paper, Typography } from '@material-ui/core';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm'
import { useStyles } from './SignUpStyles';

export const SignUp = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container} direction="column" justify="center" alignItems="center">
      <Grid item>
        <Container maxWidth="sm" className={classes.formContainer}>
          <Paper className={classes.form} elevation={0}>
            <Typography className={classes.title} component="h5" variant="h5" align="center">
              Sign Up
            </Typography>

            <SignUpForm />

            <Grid container>
              <Grid item xs />

              <Grid item>
                <Link component={RouterLink} to="/signin" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
}
