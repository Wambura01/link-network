import React, { useState, forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
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
import { registerWithEmailAndPassword } from "../../Firebase/operations";
import { auth } from "../../Firebase/firebaseConfig";

const InputFeedback = ({ error }) =>
  error ? (
    <Typography
      color="error"
      sx={{
        fontSize: "0.7rem",
        marginLeft: "1rem",
        marginTop: "0.3rem",
      }}
    >
      {error}
    </Typography>
  ) : null;

const companies = ["Safaricom", "Microsoft", "Kwara", "Twiga_Foods", "Sendy"];

function RegisterEditor() {
  const [isRegistered, setIsRegistered] = useState(false); // logged in state
  const [open, setOpen] = useState(false); // open and close alert
  const [company, setCompany] = useState("");
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

  const handleSelectChange = (e) => {
    setCompany(e.target.value);
  };

  // validating form inputs
  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required!"),
    company: Yup.string().required("Company you represent must be selected!"),
    password: Yup.string().required("Password is required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your Password is required!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      company: company,
      confirmPassword: "",
    },
    enableReinitialize: true,
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      const response = await registerWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      if (response) {
        localStorage.setItem("user", JSON.stringify(response));
        setIsRegistered(true);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      } else {
        console.log("Cannot register!");
      }

      handleClick();

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
                    sx={{ mb: "1rem" }}
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
                <FormControl sx={{ width: 457 }}>
                  <InputLabels>Company</InputLabels>
                  <Select
                    sx={{ width: "100%" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-chip"
                    name="company"
                    value={company}
                    onBlur={handleBlur}
                    onChange={handleSelectChange}
                    error={Boolean(touched.company && errors.company)}
                    helperText={touched.company && errors.company}
                  >
                    {companies.map((company) => (
                      <MenuItem key={company} value={company}>
                        {company}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {touched.company && <InputFeedback error={errors.company} />}
              </Box>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/login"
              >
                <ForgotPassword>Already have an account? Login</ForgotPassword>
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
                  Register
                </Typography>
              </Button>
            </Form>
          </FormikProvider>
        </RightContent>
      </RightDiv>
    </LoginPage>
  );
}

export default RegisterEditor;
