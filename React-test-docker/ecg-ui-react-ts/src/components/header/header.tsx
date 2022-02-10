import * as React  from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import { localStorageService } from "../../services/localStorage";
import { alertUtils } from "../../utils/alertUtils";
import { Strings } from "../../utils/strings";
import './style.css'
// HeaderComponet : It  displays a nav-bar and also handles the navbar logic.



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
interface Props {
  page: string,
}

const Header: React.FC<Props> = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const logoutFunction = () => {
    alertUtils
    .confirmationAlert(
      Strings.alertBox.logoutTitle,
      Strings.alertBox.logoutMessage,
      "warning",
       "Yes",
      "No",
      true
    )
    .then((alertResponse) => {
      if(alertResponse){
        localStorageService.logout();
    setAnchorEl(null);
    history.push("/login");    
      }
    })
    .catch(()=>{
      setAnchorEl(null);
    })
    
  };
  const goToProfile = () => {
    setAnchorEl(null);
    history.push("/profile");
  };

  const handleMenu = (event : any): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const backToHome = () => {
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.homeButton}
            color="inherit"
            aria-label="menu"
            onClick={backToHome}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.page}
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick= {handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={goToProfile}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={logoutFunction}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
