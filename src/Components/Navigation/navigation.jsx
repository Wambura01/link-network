import React from "react";
import { Link } from "react-router-dom";

import logo from "../../Assets/logo_.png";

import { Box, Typography } from "@mui/material";

function Navigation() {
  const styles = {
    a: {
      textDecoration: "none",
      color: "black",
      cursor: "pointer",
    },

    typography: {
      "&:hover": {
        fontWeight: "bold",
        marginBottom: "0.2rem",
        borderBottom: "2px solid black",
      },
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "15%" }}>
        <img src={logo} alt="Logo" />
      </Box>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <a style={styles.a} href="#home">
          <Typography sx={styles.typography}>Home</Typography>
        </a>
        <a style={styles.a} href="#about">
          <Typography sx={styles.typography}>About</Typography>
        </a>
        <a style={styles.a} href="#jobs">
          <Typography sx={styles.typography}>Jobs</Typography>
        </a>
        <a style={styles.a} href="#">
          <Typography sx={styles.typography}>Contact Us</Typography>
        </a>
      </Box>
      <Box
        sx={{
          width: "8%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: "2rem",
        }}
      >
        <Link style={{ color: "black" }} to="/choice">
          <Typography>Login</Typography>
        </Link>
        <span>|</span>
        <Link style={{ color: "black" }} to="/choice">
          <Typography>Register</Typography>
        </Link>
      </Box>
    </div>
  );
}

export default Navigation;
