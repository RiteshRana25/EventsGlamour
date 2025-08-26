import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
// import ArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import ArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import "./Header.css";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false); 

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
    if (!open) setEventsOpen(false); // close submenu when drawer closes
  };

  // const location = useLocation();
  // const isActiveEvents =
  //   location.pathname === "/celebrations" ||
  //   location.pathname === "/corporate-events";

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
      {/* <NavLink to="/wedding" onClick={toggleDrawer(false)}>
        Weddings
      </NavLink> */}

      {/* 🔹 Mobile Events menu */}
      {/* <div
        className="mobile-events-item"
        onClick={() => setEventsOpen(!eventsOpen)}
      >
        <span className={isActiveEvents ? "active" : ""} >Events</span>
        {eventsOpen ? <ArrowDownIcon /> : <ArrowRightIcon />}
      </div>
      {eventsOpen && (
        <div className="mobile-submenu">
          <NavLink
            to="/celebrations"
            onClick={toggleDrawer(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Celebrations
          </NavLink>
          <NavLink
            to="/corporate-events"
            onClick={toggleDrawer(false)}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Corporate Events
          </NavLink>
        </div>
      )} */}

      <NavLink to="/portfolio" onClick={toggleDrawer(false)}>
        Portfolio
      </NavLink>
      <NavLink to="/services" onClick={toggleDrawer(false)}>
        Services
      </NavLink>
      <NavLink to="/gallery" onClick={toggleDrawer(false)}>
        Contact Us
      </NavLink>
    </div>
  );

  return (
    <div className="navbar">
      <Link className="logo" to="/">
        <img src="logo1.png" alt="Logo" />
      </Link>

      {/* Desktop Navigation */}
      <div className="nav-links">
        <NavLink to="/" end>
          HOME
        </NavLink>
        <p>|</p>
        <NavLink to="/about">ABOUT US</NavLink>
        <p>|</p>
        {/* <NavLink to="/wedding">WEDDINGS</NavLink>
        <p>|</p> */}
{/* 
        <NavLink
          to="/celebrations"
          className={`dropdown ${isActiveEvents ? "active" : ""}`}
        >
          EVENTS
          <div className="dropdown-content">
            <NavLink
              to="/celebrations"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Celebrations
            </NavLink>
            <NavLink
              to="/corporate-events"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Corporate Events
            </NavLink>
          </div>
        </NavLink> */}
        <NavLink to="/portfolio">Portfolio</NavLink>
        <p>|</p>
        <NavLink to="/services">SERVICES</NavLink>
        <p>|</p>
        <NavLink to="/contact">CONTACT US</NavLink>
      </div>

      {/* Mobile Header */}
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

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {navItems}
      </Drawer>
    </div>
  );
};

export default Header;
