import { Link as RouterLink, useParams } from "react-router-dom";
import { Container, Grid, Link, Paper, Typography } from '@material-ui/core';
import { ResetPasswordForm } from '../../components/ResetPasswordForm/ResetPasswordForm'
import { useStyles } from './ResetPasswordStyles';

export const ResetPassword = () => {
  const classes = useStyles();
  let { token } = useParams();

  return (
    <Grid container className={classes.container} direction="column" justify="center" alignItems="center">
      <Grid item className={classes.formContainer}>
          <Paper className={classes.form} elevation={0}>
            <Typography className={classes.title} component="h5" variant="h5" align="center">
              Reset Password
            </Typography>

            <ResetPasswordForm token={token} />
          </Paper>
      </Grid>
    </Grid>
  );
}
