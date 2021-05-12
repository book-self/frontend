import { Link as RouterLink } from "react-router-dom";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { SignInForm } from '../../components/SignInForm/SignInForm'

export const SignIn = () => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Container maxWidth="xs">
          <Typography component="h5" variant="h5" align="center">
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
        </Container>
      </Grid>
    </Grid>
  );
}
