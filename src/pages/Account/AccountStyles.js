import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },

  accountIcon: {
    fontSize: '3.75rem',
    verticalAlign: 'middle'
  },

  title: {
    marginBottom: theme.spacing(0)
  },

  subtitle: {
    marginBottom: theme.spacing(2)
  }
}));
