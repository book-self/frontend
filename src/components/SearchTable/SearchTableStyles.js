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
    },
  
    bookImageCell: {
      verticalAlign: 'top',
      padding: '25px',
      borderRight: '2px solid #EAEAEA',
      flexDirection: 'column'
    },
  
    bookDataCell: {
      verticalAlign: 'top',
      position: 'relative',
      padding: '35px 35px 35px 25px',
      width: '35vw'
    },
  
    bookBlurb: {
      padding: "10px 10px 10px 10px",
      lineHeight: '1.5rem'
    }
});
