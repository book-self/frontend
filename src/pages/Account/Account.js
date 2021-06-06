import { useSelector } from 'react-redux';
import { Box, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { selectUser } from '../../store/User/UserSlice';

import { useStyles } from './AccountStyles';

export const Account = () => {
  const classes = useStyles();
  const { id, email, username } = useSelector(selectUser);

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

              <Button variant="outlined" color="secondary" className={classes.button}>
                Delete Account
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
