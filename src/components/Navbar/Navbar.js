import { Link } from "react-router-dom";
import { AppBar, ButtonBase, IconButton, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import { useStyles } from './NavbarStyles';

/* TODO re-implement this once we have login/logout functionality implemented
const [menuStatus, setMenuStatus] = useState(null);

const openMenu = (event) => {
  setMenuStatus(event.currentTarget);
};

const closeMenu = (event) => {
  setMenuStatus(null);
};

<Box>
<IconButton color="inherit" aria-label="account" aria-haspopup="true" onClick={openMenu}>
  <AccountCircle />
</IconButton>

<Menu
  id="simple-menu"
  anchorEl={menuStatus}
  keepMounted
  open={Boolean(menuStatus)}
  onClose={closeMenu}
>
  <MenuItem component={Link} to="/" onClick={closeMenu}>Sign Out</MenuItem>
</Menu>
</Box>
*/

export const Navbar = () => {
  const classes = useStyles();
  const loggedIn = false;

  return (
    <div className={classes.appBarContainer}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolBar}>

            <Link to={'/'} style={{textDecoration: 'none'}}>
              <ButtonBase>
                <div className={classes.toolBarLeftContainer}>
                    <Typography className={classes.title}>Book</Typography>
                    <img src={process.env.PUBLIC_URL + '/open-book.png'} alt={"Book Self Logo"} className={classes.image} />
                    <Typography className={classes.title}><b>Self</b></Typography>
                </div>
              </ButtonBase>
            </Link>

          <div>
            <IconButton aria-label="account">
              <Link to={loggedIn ? '/profile' : '/signup'} >
                <AccountCircle className={classes.accountIcon} />
              </Link>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

