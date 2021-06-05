import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    bookContainer: {
      display: "flex",
      width: '90vw',
      margin: '5vh auto 7.5vh auto',
      minHeight: '75vh',
      flexDirection: 'column',
      alignItems: 'center',

      [theme.breakpoints.up('lg')]: {
        flexDirection: 'row',
        alignItems: "flex-start",
      }
    },
  
    bookContainerLeft: {
      width: '40%',
      textAlign: 'center',
      height: '550px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',

      [theme.breakpoints.up('lg')]: {
        height: '75vh',
      }
    },
  
    bookImageAndRating: {
      width: '75%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      [theme.breakpoints.up('lg')]: {
        justifyContent: 'center',
      }
    },

    rating: {
      marginTop: "3vh",
      padding: '10px',

      '&:hover': {
        backgroundColor: '#EAEAEA'
      }
    },
  
    bookContainerRight: {
      boxSizing: 'border-box',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: "flex-start",
      flexDirection: 'column',
      paddingTop: '25px',

      [theme.breakpoints.up('lg')]: {
        alignItems: "flex-start",
        borderLeft: '3px solid grey',
        width: '60%',
        paddingLeft: '5%',
      }
    },
  
    bookTitle: {
      fontVariant: 'small-caps',
      textTransform: 'lowercase',
      fontWeight: 'bold',
      width: '90%',
      maxWidth: '600px',
      lineHeight: '.9',
      marginBottom: '1rem',
      textAlign: 'center',

      [theme.breakpoints.up('lg')]: {
        textAlign: 'left',
      }
    },
  
    bookAuthors: {
      margin: "1rem 0",
      width: '100%',
      maxWidth: '750px',
      textAlign: 'center',

      [theme.breakpoints.up('lg')]: {
        textAlign: 'left',
      }
    },
  
    bookBlurb: {
      padding: '2rem',
      width: '100%',
      maxWidth: '650px',
      textAlign: 'justify',
      lineHeight: '1.5rem',

      [theme.breakpoints.up('lg')]: {
        paddingLeft: '4rem',
      }
    },
  
    bookDataContainer: {
      margin: "2rem 5px 10px 10px",
      width: '90%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-around',
      flexFlow: 'wrap',

      [theme.breakpoints.up('lg')]: {
        justifyContent: 'space-between',
      }
    },
  
    bookGenreList: {
      width: '350px',
      marginBottom: '1rem',
      textAlign: 'center',

      [theme.breakpoints.up('lg')]: {
        textAlign: 'left',
      }
    },

    bookDataTable: {
      margin: '3rem 0',
      textAlign: 'right',
      width: "325px",
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
    },
}));
