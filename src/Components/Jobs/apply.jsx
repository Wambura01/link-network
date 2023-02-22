import React, { useState, forwardRef } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import MuiAlert from "@mui/material/Alert";

const InputFeedback = ({ error }) =>
  error ? (
    <Typography
      color="error"
      sx={{
        fontSize: "0.8rem",
        fontFamily: "Rubik, sans-serif",
        marginLeft: "1rem",
        marginTop: "0.3rem",
      }}
    >
      {error}
    </Typography>
  ) : null;

export default function Apply() {
  const [open, setOpen] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // customizable alert
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const ApplyJobSchema = Yup.object().shape({
    name: Yup.string().required("Admin email is required"),
    email: Yup.string().email().required("Admin email is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      resume: "",
    },
    validationSchema: ApplyJobSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("VALUES: ", values);
      //   if (emailCheckResponse === false) {
      //     const response = await addAdmin(values, exists);

      //     if (response.created) {
      //       handleClose();
      //       setIsCreated(true);
      //       setOpenSnackbar(true);
      //       setTimeout(function () {
      //         window.location.reload();
      //       }, 3000);
      //     } else {
      //       setOpenSnackbar(true);
      //     }
      //   }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  return (
    <div style={{ width: "20%" }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={isApplied ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {isApplied ? "Applied successfully!!!" : "Cannot Apply to job!!!"}
        </Alert>
      </Snackbar>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          fontFamily: "Rubik, sans-serif",
          fontWeight: "500",
          fontSize: ".88rem",
          backgroundColor: "black",
          transition: "all 0.2s linear",
          padding: ".5rem 2rem",
          mr: "1rem",

          "&:hover": {
            backgroundColor: "white",
            border: "2px solid black",
            color: "black",
          },
        }}
        startIcon={<AddOutlinedIcon />}
      >
        Apply
      </Button>
      <Dialog open={open} onClose={handleClose} onBackdropClick="false">
        <DialogTitle
          sx={{ fontFamily: "PRubik, sans-serif", fontWeight: "bold" }}
        >
          Apply to job
        </DialogTitle>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                fullWidth
                autoComplete="name"
                type="text"
                margin="normal"
                label="Name"
                {...getFieldProps("name")}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                fullWidth
                autoComplete="email"
                type="email"
                margin="normal"
                label="Email"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                multiline
                row={5}
                autoComplete="resume"
                type="resume"
                margin="normal"
                label="Curriculum Vitae"
                {...getFieldProps("resume")}
                error={Boolean(touched.resume && errors.resume)}
                helperText={touched.resume && errors.resume}
              />
            </DialogContent>
            <DialogActions>
              <Button
                sx={{
                  fontFamily: "Rubik, sans-serif",
                  fontWeight: "500",
                  fontSize: ".88rem",
                  color: "red",
                  border: "2px solid red",
                  borderRadius: "10px",
                  marginRight: "3rem",
                }}
                onClick={handleClose}
                type="reset"
              >
                Cancel
              </Button>
              <Button
                sx={{
                  fontFamily: "Rubik, sans-serif",
                  fontWeight: "500",
                  fontSize: ".88rem",
                  backgroundColor: "black",
                  color: "white",
                  transition: "all 0.2s linear",
                  padding: ".5rem 2rem",
                  mr: "1rem",

                  "&:hover": {
                    backgroundColor: "white",
                    border: "2px solid black",
                    color: "black",
                  },
                }}
                type="submit"
              >
                Apply
              </Button>
            </DialogActions>
          </Form>
        </FormikProvider>
      </Dialog>
    </div>
  );
}
