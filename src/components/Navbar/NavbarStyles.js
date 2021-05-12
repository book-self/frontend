import { makeStyles } from '@material-ui/core';

const appBarHeight = "90px";

export const useStyles = makeStyles({
  appBarContainer: {
    height: appBarHeight
  },
  
  toolBar: {
    height: appBarHeight,
    justifyContent: 'space-between'
  },
  
  toolBarLeftContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
    border: '3px solid black'
  },
  
  title: {
    fontVariant: "small-caps",
    textTransform: "lowercase",
    color: 'black',
    fontSize: '1.75rem'
  },
  
  image: {
    width: "50px",
    margin: "0 12px 0 12px"
  },

  accountIcon: {
    fontSize: '2.5rem',
    color: 'white'
  },
});
