import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
    bookContainer: {
      display: "flex",
      alignItems: "flex-start",
      width: '80vw',
      margin: '6vh auto 7.5vh auto',
      minHeight: '75vh'
    },
  
    bookContainerLeft: {
      width: '40%',
      textAlign: 'center',
      height: '75vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
  
    bookImageAndRating: {
      width: '75%',
      height: '100%',
      paddingRight: '2rem',
      borderRight: '5px solid grey',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
  
    bookContainerRight: {
      width: '60%',
      height: '100%',
      display: 'flex',
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexDirection: 'column',
      padding: '25px'
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
  
    bookBlurb: {
      padding: '2rem',
      width: '35vw',
      textAlign: 'justify'
    },
  
    bookDataContainer: {
      margin: "15px 5px 10px 10px",
      width: '20vw',
      position: 'relative'
    },
  
    bookDataTable: {
      position: 'absolute',
      left: '25vw',
      bottom: '15px',
      width: "100%",
      textAlign: 'right'
    },
  
    bookDataLabel: {
      textAlign: 'left',
      fontWeight: 'bold', 
    },
  
    carouselContainer: {
      display: "flex",
      flexDirection: 'column',
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "100px"
    }
});
