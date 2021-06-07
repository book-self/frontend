import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    height: '70vh',
    minHeight: '320px'
  },

  title: {
    padding: theme.spacing(2),
  },

  form: {
    padding: theme.spacing(3),
    maxWidth: '440px',
    margin: '0 auto'
  },

  formContainer: {
    padding: theme.spacing(0),
    width: '100%'
  }
}));
