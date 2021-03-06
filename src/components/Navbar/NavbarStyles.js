import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  toolBar: {
    justifyContent: 'space-between'
  },

  toolBarLeftContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '5px 10px',
    paddingBottom: '5px',
    borderRadius: '5px',
    border: '3px solid black',
  },

  title: {
    fontVariant: "small-caps",
    textTransform: "lowercase",
    color: 'black',
    fontSize: '1.5rem'
  },

  navBarCurrentRoute: {
    fontWeight: 'bold',
    textDecoration: 'underline'
  },

  image: {
    width: "25px",
    margin: "0 6px 0 6px"
  },

  accountIcon: {
    fontSize: '2rem',
    color: theme.palette.common.white
  },

  icon: {
    fontSize: '1.25rem',
    marginRight: theme.spacing(1)
  },

  menu: {
    marginLeft: theme.spacing(4),
    flexGrow: 1
  },

  button: {
    color: theme.palette.common.white
  },

  search: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4)
  },

  account: {
    padding: theme.spacing(1,2),
    fontWeight: 'bold',
    cursor: 'default'
  }
}));
