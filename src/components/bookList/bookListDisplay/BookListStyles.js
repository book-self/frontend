import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) =>({
    bookContainer: {
      display: "flex",
      alignItems: "flex-start",
      width: '80vw',
      margin: '6vh auto 7.5vh auto',
      minHeight: '75vh'
    },
  
    rootBookList:{
        flexGrow: 1,

    },
    gridList: {
    width: 800,
    height: 400,
    },
    
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    paperListOptions:{
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 800,

    }
}));
