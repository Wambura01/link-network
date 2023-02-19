import React from "react";
import { useFormik, Form, FormikProvider, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import logo from "../../Assets/logo.png";

//styles
import { LoginPage, LogoStyles, RightContent, Heading } from "./loginStyles";

function Choice() {
  const navigate = useNavigate();

  // validating form inputs
  const ChoiceSchema = Yup.object().shape({
    role: Yup.string().required("Role is required!"),
  });

  const formik = useFormik({
    initialValues: { role: "" },
    validationSchema: ChoiceSchema,
    onSubmit: (values) => {
      localStorage.setItem("role", values.role);
      values.role === "admin"
        ? navigate("/register-admin")
        : navigate("/login");
    },
  });

  const { errors, handleSubmit } = formik;

  return (
    <LoginPage>
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
          height: "100vh",
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
          <Heading>Kindly provide the details below to login:</Heading>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box sx={{ mt: "1.2rem" }}>
                <Typography sx={{ fontWeight: "bold" }}>Role</Typography>
                <Box
                  sx={{
                    display: "flex",
                    margin: "1rem 4rem 0 0",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "1.1rem",
                      marginRight: "5rem",
                    }}
                  >
                    <Field type="radio" name="role" value="student" />
                    Student
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "1.1rem",
                      marginRight: "5rem",
                    }}
                  >
                    <Field type="radio" name="role" value="editor" />
                    Editor
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "1.1rem",
                    }}
                  >
                    <Field type="radio" name="role" value="admin" />
                    Admin
                  </label>
                </Box>
              </Box>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  padding: "1rem 0",
                  backgroundColor: "black",
                  mt: "4rem",

                  "&:hover": {
                    backgroundColor: "white",
                    color: "black",
                    border: "2px solid black",
                  },
                }}
                fullWidth
              >
                <Typography sx={{ fontWeight: "bold", fontSize: ".9rem" }}>
                  Next
                </Typography>
              </Button>
            </Form>
          </FormikProvider>
        </RightContent>
      </Box>
    </LoginPage>
  );
}

export default Choice;
