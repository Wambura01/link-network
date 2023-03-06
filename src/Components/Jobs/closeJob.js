import React, { useState, forwardRef } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { Link as RouterLink, Outlet } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import BlockIcon from "@mui/icons-material/Block";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { db } from "../../Firebase/firebaseConfig";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export default function CloseJob({ jobId }) {
  const [open, setOpen] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // customizable alert
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const closeJob = async (values) => {
    const sessionUser = JSON.parse(localStorage.getItem("user"));
    let closed = false;
    const usersRef = doc(db, "jobs", jobId);
    try {
      await updateDoc(usersRef, {
        suspensionDetails: {
          ...values,
          doneBy: sessionUser[0].uid,
          doneByEmail: sessionUser[0].email,
          updatedAt: serverTimestamp(),
        },
        isClosed: true,
      });
      closed = true;

      return { closed };
    } catch (error) {
      console.log("Error while closing job: ", error);
      return { error, closed };
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const CloseJobSchema = Yup.object().shape({
    reason: Yup.string().required("Reason for closing job is required"),
  });

  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: CloseJobSchema,
    onSubmit: async (values, { resetForm }) => {
      const response = await closeJob(values);

      if (response.closed) {
        setIsClosed(true);
        setOpenSnackbar(true);
        resetForm();
        handleClose();
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      } else {
        setOpenSnackbar(true);
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, values } = formik;

  return (
    <div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleClose}
          severity={isClosed ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {isClosed ? "Job closed successfully!!!" : "Cannot close job!!!"}
        </Alert>
      </Snackbar>
      <MenuItem
        component={RouterLink}
        to="#"
        sx={{ color: "text.secondary" }}
        onClick={handleClickOpen}
      >
        <ListItemIcon>
          <BlockIcon width={24} height={24} />
        </ListItemIcon>
        <ListItemText
          primary="Close Job"
          primaryTypographyProps={{ variant: "body2" }}
        />
      </MenuItem>
      <Dialog open={open} onClose={handleClose} onBackdropClick="false">
        <DialogTitle sx={{ fontWeight: "bold" }}>Close Job</DialogTitle>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogContent>
              <Typography
                sx={{
                  fontStyle: "italic",
                  color: "red",
                  marginBottom: "1.3rem",
                  fontSize: ".92rem",
                  maxWidth: "80%",
                }}
              >
                ***IMPORTANT - Are you sure you want to close this job?
              </Typography>
              <TextField
                fullWidth
                autoComplete="reason"
                multiline
                rows={3}
                type="text"
                margin="normal"
                label="Reason for closure"
                {...getFieldProps("reason")}
                error={Boolean(touched.reason && errors.reason)}
                helperText={touched.reason && errors.reason}
              />
            </DialogContent>
            <DialogActions>
              <Button
                sx={{ fontFamily: "Rubik, sans-serif" }}
                variant="outlined"
                color="success"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                sx={{ fontFamily: "Rubik, sans-serif" }}
                variant="contained"
                type="submit"
                color="error"
              >
                Close
              </Button>
            </DialogActions>
          </Form>
        </FormikProvider>
      </Dialog>
      <Outlet />
    </div>
  );
}
