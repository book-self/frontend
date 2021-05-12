import { Link as RouterLink } from "react-router-dom";
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { SignUpForm } from '../../components/SignUpForm/SignUpForm'

export const SignUp = () => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Container maxWidth="xs">
          <Typography component="h5" variant="h5" align="center">
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
        </Container>
      </Grid>
    </Grid>
  );
}
