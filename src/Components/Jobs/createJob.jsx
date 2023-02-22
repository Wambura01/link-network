import React, { useState, forwardRef } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import uuid from "react-uuid";
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
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

import { InputContainer, InputLabels } from "../Login/loginStyles";
import { createJob } from "../../Firebase/operations";
import { convertJobDesc } from "../../Utils/convertJobDescription";

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

const types = ["Contract", "Full-Time", "Internship"];

export default function CreateJob() {
  const [open, setOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [jobType, setJobType] = useState("");
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

  const handleSelectChange = (e) => {
    setJobType(e.target.value);
  };

  const CreateJobSchema = Yup.object().shape({
    company_name: Yup.string().required("Company name is required"),
    description: Yup.string().required("Role responsibilities required"),
    role: Yup.string().required("Job role is required"),
    type: Yup.string().required("Job type is required"),
  });

  const formik = useFormik({
    initialValues: {
      company_name: "",
      description: "",
      role: "",
      type: jobType,
    },
    enableReinitialize: true,
    validationSchema: CreateJobSchema,
    onSubmit: async (values, { resetForm }) => {
      values["count"] = 0;
      values["description"] = convertJobDesc(values.description);
      values["id"] = uuid();
      console.log("VALUES: ", values);

      const response = await createJob(values);

      if (response) {
        resetForm();
        handleClose();
        setIsAdded(true);
        setOpenSnackbar(true);
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      } else {
        setOpenSnackbar(true);
      }
    },
  });

  const { errors, touched, handleSubmit, handleBlur, getFieldProps } = formik;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "end",
      }}
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={isAdded ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {isAdded ? "Job added successfully!!!" : "Cannot Add job!!!"}
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
          mr: "2rem",
          mt: "1.5rem",

          "&:hover": {
            backgroundColor: "white",
            border: "2px solid black",
            color: "black",
          },
        }}
        startIcon={<AddOutlinedIcon />}
      >
        Add Job
      </Button>
      <Dialog open={open} onClose={handleClose} onBackdropClick="false">
        <DialogTitle
          sx={{ fontFamily: "PRubik, sans-serif", fontWeight: "bold" }}
        >
          Add new job
        </DialogTitle>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogContent>
              <InputContainer>
                <InputLabels>Company Name</InputLabels>
                <TextField
                  fullWidth
                  autoComplete="company_name"
                  type="text"
                  margin="normal"
                  {...getFieldProps("company_name")}
                  error={Boolean(touched.company_name && errors.company_name)}
                  helperText={touched.company_name && errors.company_name}
                />
              </InputContainer>
              <InputContainer>
                <InputLabels>Job Role</InputLabels>
                <TextField
                  fullWidth
                  autoComplete="role"
                  type="text"
                  margin="normal"
                  {...getFieldProps("role")}
                  error={Boolean(touched.role && errors.role)}
                  helperText={touched.role && errors.role}
                />
              </InputContainer>
              <FormControl sx={{ width: 457 }}>
                <InputLabels>Job Type</InputLabels>
                <Select
                  sx={{ width: "100%" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-chip"
                  name="type"
                  value={jobType}
                  onBlur={handleBlur}
                  onChange={handleSelectChange}
                  error={Boolean(touched.type && errors.type)}
                  helperText={touched.type && errors.type}
                >
                  {types.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {touched.type && <InputFeedback error={errors.type} />}
              <InputContainer>
                <InputLabels>Job Responsibilities</InputLabels>
                <TextField
                  fullWidth
                  multiline
                  row={5}
                  autoComplete="description"
                  type="description"
                  margin="normal"
                  {...getFieldProps("description")}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
              </InputContainer>
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
                Add Job
              </Button>
            </DialogActions>
          </Form>
        </FormikProvider>
      </Dialog>
    </div>
  );
}
