import React, { useState } from "react";
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
  const [shouldOpenMenu, setOpenMenu] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const { authToken, setAuthToken, setUser } = useAuth();

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const openMenu = (e) => {
    setOpenMenu(true);
    setMenuAnchor(e.currentTarget);
  };

  const logOut = () => {
    setAuthToken();
    setUser();
    closeMenu();
  };

  return (
    <AppBar position="static" style={{ marginBottom: "30px", background: "#3fc5f0" }}>
      {authToken ? (
        <Menu
          id="menu"
          anchorEl={menuAnchor}
          keepMounted
          open={shouldOpenMenu}
          onClose={() => closeMenu}
        >
          <MenuItem onClick={() => closeMenu()}>
            <Link to="/dashboard" style={{ textDecoration: "none", color: "#000" }}>
              Home
            </Link>
          </MenuItem>
          <MenuItem onClick={() => logOut()}>
            <Link to="/" style={{ textDecoration: "none", color: "#000" }}>
              Log out
            </Link>
          </MenuItem>
          <MenuItem onClick={() => closeMenu()}>
            Close Menu
          </MenuItem>
        </Menu>
      ) : null}
      <Toolbar>
        {authToken ? (
          <IconButton edge="start" color="inherit" onClick={(e) => openMenu(e)}>
            <MenuIcon />
          </IconButton>
        ) : null}
        <Typography variant="h6">Mood Tracker</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;