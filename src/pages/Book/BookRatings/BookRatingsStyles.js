
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    ratingsContainer: {
      display: 'flex',
      width: '95vw',
      margin: '200px auto 100px auto',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',

      [theme.breakpoints.up('lg')]: {
        flexDirection: 'row',
        alignItems: 'flex-start',
      }
    },

    ratingsStatistics: {
      width: '375px',

      [theme.breakpoints.up('lg')]: {
        paddingRight: '1.75%',
        borderRight: '2px solid grey',
      }
    },

    ratingsStatisticsInnerBox: {
      padding: '35px'
    },

    averageRatingBox: {
      backgroundColor: '#EAEAEA',
      padding: '1.15rem',
      textAlign: 'center'
    },

    outOfFiveStars: {
      position: 'relative',
      fontSize: '1.15rem',
      top: '-.45rem',
      left: '.5rem',
      fontWeight: 'bold'
    },

    numberRatings: {
      marginTop: '.5rem',
      fontSize: '1.15rem',
      textAlign: 'center'
    },

    ratingsBrokenDownBox: {
      margin: 'auto',
      width: '90%',
      textAlign: 'center'
    },

    ratingPercentage: {
      position: 'relative',
      fontSize: '1rem',
      top: '-.40rem',
      left: '.5rem',
      marginRight: '7.5px'
    },

    ratingsDisplayContainer: {
      width: '95%',
      margin: 'auto',

      [theme.breakpoints.up('lg')]: {
        marginLeft: '5em',
        width: 'initial',
        margin: 'initial'
      }
    }, 

    ratingAndPercentage: {
      marginTop: '.5rem',
      padding: '.5rem 1rem .5rem 1rem',

      '&:hover': {
        backgroundColor: '#EAEAEA'
      },

      '&:first-of-type': {
        marginTop: '1.5rem',
      }
    }
}));
