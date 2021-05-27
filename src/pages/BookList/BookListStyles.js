import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) =>({
    bookContainer: {
        display :'block',
        width: '30vw',
        height: '30vw'
    },
    gridList: {
        width: 800,
        height: 500,
    },
   
    fabRoot: {
    "& > *": {
      margin: theme.spacing(3),
    },
    background: 'white',
        position: '-webkit-sticky',
        position: 'sticky',
        top: 20,
        bottom: 20, 
        paddingTop: '40px',
        paddingBottom: '40px',
        zIndex: 5,
  },
    
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        
    },
    paperListOptions:{
        padding: theme.spacing(2),
        margin: 'auto',

    },
    rootBookList:{
        flexGrow: 1,

    },
}));
