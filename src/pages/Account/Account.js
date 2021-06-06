import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { selectUser, clearUser, deleteUser } from '../../store/User/UserSlice';

import { useStyles } from './AccountStyles';

export const Account = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { isSuccess, isError, id, email, username } = useSelector(selectUser);

  useEffect(() => {
    return () => {
      dispatch(clearUser());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(clearUser());
    }

    if (isSuccess) {
      dispatch(clearUser());
      history.push('/');
    }
  }, [dispatch, history, isError, isSuccess]);

  const deleteAccount = (event) => {
    dispatch(deleteUser(id));
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper elevation={0} m={3}>
        <Grid container>
          <Grid item xs={12}>
            <Box p={3}>
              <Typography component="h3" variant="h3" className={classes.title}>
                <AccountCircle className={classes.accountIcon} /> Account
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box p={3} pt={0}>
              <Typography component="h5" variant="h5" className={classes.subtitle}>
                Details
              </Typography>

              <TextField
                margin="normal"
                disabled
                fullWidth
                name="email"
                label="Email Address"
                type="email"
                id="email"
                value={email}
              />

              <TextField
                margin="normal"
                disabled
                fullWidth
                name="username"
                label="Username"
                type="text"
                id="username"
                value={username}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box p={3} pt={0}>
              <Typography component="h5" variant="h5" className={classes.subtitle}>
                Settings
              </Typography>

              <Button variant="outlined" color="secondary" className={classes.button} onClick={() => { deleteAccount(); }}>
                Delete Account
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
