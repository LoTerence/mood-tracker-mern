import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import {
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import { useAuth } from "../../context/auth";

function Appbar() {
  const { displayContent } = useContext(GlobalContext);
  const [shouldOpenMenu, setOpenMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const { authToken, setAuthToken, setUser } = useAuth();

  const openMenu = (e) => {
    setOpenMenu(true);
    setMenuAnchor(e.currentTarget);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const displayHome = () => {
    displayContent("Home");
    closeMenu();
  };

  const logOut = () => {
    setAuthToken();
    setUser();
    closeMenu();
  };

  return (
    <AppBar
      position="fixed"
      style={{ marginBottom: "30px", background: "#3fc5f0", zIndex: 99 }}
    >
      {authToken ? (
        <Menu
          id="menu"
          anchorEl={menuAnchor}
          keepMounted
          open={shouldOpenMenu}
          onClose={() => closeMenu}
        >
          <MenuItem onClick={() => displayHome()}>
            <div style={{ textDecoration: "none", color: "#000" }}>Home</div>
          </MenuItem>
          <MenuItem onClick={() => logOut()}>
            <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
              Log out
            </Link>
          </MenuItem>
          <MenuItem onClick={() => closeMenu()}>Close Menu</MenuItem>
        </Menu>
      ) : null}
      <Toolbar>
        {authToken ? (
          <IconButton edge="start" color="inherit" onClick={(e) => openMenu(e)}>
            <MenuIcon />
          </IconButton>
        ) : null}
        <Link to="#" onClick={() => displayHome()} style={{ textDecoration: "none", color: "#000" }}>
          <Typography variant="h6">Mood Tracker</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
