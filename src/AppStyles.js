import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },

  main: {
    marginTop: '64px'
  },

  content: {
    flex: '1 0 auto'
  },

  footer: {
    flexShrink: 0
  }
});