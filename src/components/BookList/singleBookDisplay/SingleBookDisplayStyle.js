import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
    bookContainer: {
      display: "flex",
      alignItems: "flex-start",
      width: '80vw',
      margin: '6vh auto 7.5vh auto',
      minHeight: '75vh'
    },
    tooltipContainer: {
        padding: '12px'
    },
    tooltipTitle: {
        fontWeight: 'bold'
    },

    genresContainer: {
        margin: "15px 5px 10px 10px"
    },

    bookCard: {
        width: "20vw",
        textAlign: "center",
        margin: "25px",
        minHeight: '350px'
    },
  
    root:{
        display: 'flex',

    },
    bookTitle: {
      fontVariant: 'small-caps',
      textTransform: 'lowercase',
      fontWeight: 'bold',
      width: '35vw',
      lineHeight: '.9'
    },
  
    bookAuthors: {
      margin: "1rem 0"
    },
  
    bookDataContainer: {
      width: '20vw',
      position: 'relative'
    },
  
    bookDataTable: {
      position: 'absolute',
      left: '25vw',
      bottom: '10px',
      width: "100%",
      textAlign: 'right'
    },
  
    bookDataLabel: {
      textAlign: 'left',
      fontWeight: 'bold', 
    },
});
