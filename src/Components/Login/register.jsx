import React, { useState, forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

// import { registerWithEmailAndPassword } from "../../firebase/firebase";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import logo from "../../Assets/logo.png";

//styles
import {
  LeftDiv,
  LoginPage,
  LogoStyles,
  RightDiv,
  RightContent,
  Heading,
  InputContainer,
  InputLabels,
  ForgotPassword,
} from "./loginStyles";

function Register() {
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

  // validating form inputs
  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required!"),
    password: Yup.string().required("Password is required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your Password is required!"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "" },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      //   const response = await registerWithEmailAndPassword(
      //     values.email,
      //     values.password
      //   );
      //   if (response) {
      //     console.log("user", response);
      //     localStorage.setItem("user", JSON.stringify(response));
      //     setIsRegistered(true);
      //     setTimeout(() => {
      //       navigate("/enroll", { replace: true });
      //     }, 1000);
      //   } else {
      //     console.log("Cannot register!");
      //   }

      //   handleClick();

      console.log("Values: ", values);
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

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
      <LeftDiv className="left">
        <Box sx={{ width: "90%" }}>
          <Box>
            <LogoStyles className="logo-img">
              <img src={logo} alt="logo" />
            </LogoStyles>
          </Box>
        </Box>
      </LeftDiv>
      <RightDiv className="right">
        <RightContent>
          <Heading>Kindly provide the details below to register:</Heading>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box sx={{ mt: "1.2rem" }}>
                <InputContainer>
                  <InputLabels>Email Address</InputLabels>
                  <TextField
                    sx={{ mb: "4rem" }}
                    placeholder="Enter your email"
                    variant="filled"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </InputContainer>
                <InputContainer>
                  <InputLabels>Password</InputLabels>
                  <TextField
                    sx={{ mb: "1rem" }}
                    placeholder="Enter your password"
                    variant="filled"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </InputContainer>
                <InputContainer>
                  <InputLabels>Confirm Password</InputLabels>
                  <TextField
                    sx={{ mb: "1rem" }}
                    placeholder="Confirm your password"
                    variant="filled"
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                  />
                </InputContainer>
              </Box>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/login"
              >
                <ForgotPassword>Already have an account? Login</ForgotPassword>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    padding: "1rem 0",
                    backgroundColor: "black",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "black",
                      border: "2px solid black",
                    },
                  }}
                  fullWidth
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: ".9rem" }}>
                    Register
                  </Typography>
                </Button>
              </Link>
            </Form>
          </FormikProvider>
        </RightContent>
      </RightDiv>
    </LoginPage>
  );
}

export default Register;
