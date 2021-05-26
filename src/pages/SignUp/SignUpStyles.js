import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    height: '70vh',
    minHeight: '480px'
  },

  title: {
    padding: theme.spacing(2),
  },

  form: {
    padding: theme.spacing(3),
    maxWidth: '440px'
  },

  formContainer: {
    padding: theme.spacing(0)
  }
}));
