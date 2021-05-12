import { makeStyles } from '@material-ui/core';

const borderInside = '10px solid grey';
const borderOutside = '15px solid black';

export const useStyles = makeStyles({
  headerContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '62.5vh'
  },

  contentContainer: {
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'column',
    textAlign: 'left',
  },

  leftContainer: {
    alignItems: 'flex-end',
  },

  rightContainer: {
    alignItems: 'flex-start',
  },

  headerCard: {
    height: '57.5vh',
    width: '500px'
  },

  leftCard: {
    borderRight: borderInside,
    padding: "10px 30px 25px 50px",
    borderLeft: borderOutside,
    borderTop: borderOutside,
  },

  bookselfTitle: {
    fontSize: '6rem',
    textAlign: 'left',
    marginLeft: '0', 
    paddingLeft: "0",
    marginBottom: "5px",
    fontVariant: "small-caps",
    textTransform: "lowercase"
  },

  bookselfDescription: {
    fontSize: '1.5rem',
    fontWeight: "bold",
    marginBottom: "35px"
  },

  featuresList: {
    listStyleType: "none",
    width: "300px"
  },

  featuresBulletpoints: {
    fontSize: '1.15rem',
    marginBottom: "20px"
  },

  rightCard: {
    borderLeft: borderInside,
    padding: "10px 30px 25px 30px",
    borderRight: borderOutside,
    borderBottom: borderOutside, 
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  searchBarText: {
    fontSize: '1.75rem',
    marginBottom: "40px",
    width: '100%'
  },

  searchBar: {
    width: "400px"
  },

  categoriesContainer: {
    marginTop: "55px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },

  categoriesList: {
    marginLeft: 0,
    padding: 0,
    listStyleType: "none",
    width: "485px",
    textAlign: 'center'
  },

  categoriesListItem: {
    display: "inline-block",
    margin: "5px"
  },

  carouselContainer: {
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "100px"
  },

  scrollToTopButton: {
    position: 'fixed',
    bottom: '25px',
    right: '25px',
    backgroundColor: '#EAEAEA',
  }
});
