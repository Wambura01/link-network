import React, { useState, useEffect, forwardRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

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
import { logInWithEmailAndPassword } from "../../Firebase/operations";
import { auth } from "../../Firebase/firebaseConfig";

function Login() {
  const [isLogged, setIsLogged] = useState(false); // logged in state
  const [open, setOpen] = useState(false); // open and close alert
  const [role, setRole] = useState("");
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

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, [role]);

  // validating form inputs
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required!"),
    password: Yup.string().required("Password is required!"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      const response = await logInWithEmailAndPassword(auth, values, role);
      if (response) {
        console.log("user", response);
        localStorage.setItem("user", JSON.stringify(response));
        setIsLogged(true);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      } else {
        console.log("Wrong Credentials!");
      }

      handleClick();

      console.log("Credentials: ", values);
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <LoginPage>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={isLogged ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {isLogged
            ? "Logged in successfully!!!"
            : "Incorrect Email or Password!!!"}
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
          <Heading>Kindly provide the details below to login:</Heading>
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
              </Box>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={
                  role === "student"
                    ? "/register"
                    : role === "editor"
                    ? "/register-editor"
                    : "/register-admin"
                }
              >
                <ForgotPassword>Don't have an account? Register</ForgotPassword>
              </Link>
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
                  Login
                </Typography>
              </Button>
            </Form>
          </FormikProvider>
        </RightContent>
      </RightDiv>
    </LoginPage>
  );
}

export default Login;
