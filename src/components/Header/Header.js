import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import "./Header.css";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

const toggleDrawer = (open) => () => {
  setDrawerOpen(open);
  if (!open) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", 
    });
  }
};

  const goToTop = ()=>{
 window.scrollTo(0, 0); 
  }

  const navItems = (
    <div className="drawer-content">
      <div className="drawer-header">
        <IconButton onClick={toggleDrawer(false)} className="close-btn">
          <CloseIcon />
        </IconButton>
      </div>
      <NavLink to="/" end onClick={toggleDrawer(false)}>
        Home
      </NavLink>
      <NavLink to="/about" onClick={toggleDrawer(false)}>
        About Us
      </NavLink>
      <NavLink to="/portfolio" onClick={toggleDrawer(false)}>
        Portfolio
      </NavLink>
      <NavLink to="/services" onClick={toggleDrawer(false)}>
        Services
      </NavLink>
      <NavLink to="/contact" onClick={toggleDrawer(false)}>
        Contact Us
      </NavLink>
    </div>
  );

  return (
    <div className="navbar">
      <Link className="logo" to="/">
        <img src="/logo1.png" alt="Logo" />
      </Link>

      <div className="nav-links">
        <NavLink to="/" end onClick={goToTop}>
          HOME
        </NavLink>
        <p>|</p>
        <NavLink to="/about" onClick={goToTop}>ABOUT US</NavLink>
        <p>|</p>
        <NavLink to="/portfolio" onClick={goToTop}>Portfolio</NavLink>
        <p>|</p>
        <NavLink to="/services" onClick={goToTop}>SERVICES</NavLink>
        <p>|</p>
        <NavLink to="/contact" onClick={goToTop}>CONTACT US</NavLink>
      </div>

      <div className="mobhead">
        <IconButton
          className="hamburger"
          onClick={toggleDrawer(true)}
          edge="start"
        >
          <MenuIcon fontSize="small" />
        </IconButton>
        <div className="headlogo">
          <img src="/logo1.png" alt="Logo" />
        </div>
      </div>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {navItems}
      </Drawer>
    </div>
  );
};

export default Header;
