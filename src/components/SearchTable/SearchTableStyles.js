import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
    mainContainer: {
      display: "flex",
      alignItems: "center",
      minHeight: "70vh",
      padding: "7.5vh 7.5vw",
      flexDirection: "column",
      textAlign: 'center'
    },
  
    tableRow: {
      width: '100%',

      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#EAEAEA'
      },


      '&:hover td:last-of-type': {
        borderLeft: '2px solid white',
      },

      '&:hover td:first-of-type': {
        borderRight: '2px solid white',
        borderLeft: 'none'
      },
    },
  
    bookImageCell: {
      verticalAlign: 'top',
      padding: '25px',
      borderRight: '2px solid #EAEAEA',
      flexDirection: 'column',
    },
  
    bookDataCell: {
      verticalAlign: 'top',
      position: 'relative',
      padding: '35px 35px 35px 25px',
      maxWidth: '700px',
    },
  
    bookBlurb: {
      padding: "15px",
      lineHeight: '1.5rem',
      fontSize: '1.05rem'
    },

    addToBookListCell: {
      borderLeft: '2px solid #EAEAEA',
    }
});
