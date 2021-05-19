import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
    bookContainer: {
      display: "flex",
      alignItems: "flex-start",
      width: '90vw',
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
  
    bookContainerRight: {
      boxSizing: 'border-box',
      width: '60%',
      height: '100%',
      display: 'flex',
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexDirection: 'column',
      padding: '25px',
      paddingLeft: '100px',
      borderLeft: '3px solid grey',
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
      paddingLeft: '4rem',
      width: '37.5vw',
      textAlign: 'justify',
      lineHeight: '1.5rem'
    },
  
    bookDataContainer: {
      margin: "2rem 5px 10px 10px",
      width: '90%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      flexFlow: 'wrap'
    },
  
    bookGenreList: {
      width: '350px',
      marginBottom: '1rem'
    },

    bookDataTable: {
      marginTop: '2rem',
      textAlign: 'right',
      width: "350px"
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
