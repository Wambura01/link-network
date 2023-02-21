import React, { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import MuiAlert from "@mui/material/Alert";

import GoogleIcon from "@mui/icons-material/Google";

import logo from "../../Assets/logo.png";

//styles
import {
  LeftDiv,
  LoginPage,
  LogoStyles,
  RightDiv,
  RightContent,
  Heading,
} from "./loginStyles";
import { loginWithPopup } from "../../Firebase/operations";
import { auth } from "../../Firebase/firebaseConfig";

function RegisterAdmin() {
  const [isRegistered, setIsRegistered] = useState(false); // logged in state
  const [open, setOpen] = useState(false); // open and close alert
  let navigate = useNavigate();

  // customizable alert
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClick = () => {
    setOpen(true);
  };

  // handle closing of alert
  const handleClose = () => {
    setOpen(false);
  };

  const handlePopup = async (auth) => {
    const response = await loginWithPopup(auth);

    if (response) {
      setIsRegistered(true);
      handleClick();
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <LoginPage>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={isRegistered ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {isRegistered ? "Registered successfully!!!" : "Not Registered!!!"}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          width: "50%",
          height: "100vh",
          background: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          "@media(max-width: 768px)": {
            display: "none",
          },
        }}
        className="left"
      >
        <Box sx={{ width: "90%" }}>
          <Box>
            <LogoStyles className="logo-img">
              <img src={logo} alt="logo" />
            </LogoStyles>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",

          "@media(max-width: 768px)": {
            width: "100%",
          },
        }}
      >
        <RightContent>
          <Heading>Kindly click the button below to register:</Heading>
          <Button
            sx={{ border: "2px solid black", color: "black" }}
            onClick={() => handlePopup(auth)}
            variant="outlined"
            endIcon={<GoogleIcon />}
          >
            Sign in with
          </Button>
        </RightContent>
      </Box>
    </LoginPage>
  );
}

export default RegisterAdmin;
