import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import Navigation from "../Navigation/navigation";

import Safaricom from "../../Assets/saf-logo.png";
import Kwara from "../../Assets/kwara-logo.png";
import Microsoft from "../../Assets/ms-logo.jpg";
import Sendy from "../../Assets/sendy-logo.png";
import Twiga from "../../Assets/twiga-logo.png";
import Blank from "../../Assets/blank.jpg";

import { Box, Typography, Tooltip, CircularProgress } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import RemoveIcon from "@mui/icons-material/Remove";

import Apply from "../Jobs/apply";
import { db } from "../../Firebase/firebaseConfig";
import CreateJob from "../Jobs/createJob";

function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <CircularProgress sx={{ color: "black" }} />
    </Box>
  );
}

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [role, setRole] = useState(false);
  const [editor, setEditor] = useState(null);
  const [lsEditor, setLsEditor] = useState(null);

  const getLogos = (company) => {
    switch (company) {
      case "Safaricom":
        return Safaricom;
      case "Kwara":
        return Kwara;
      case "Microsoft":
        return Microsoft;
      case "Sendy":
        return Sendy;
      case "Twiga Foods":
        return Twiga;
      default:
        return Blank;
    }
  };

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setLsEditor(JSON.parse(localStorage.getItem("user")));

    // fetch jobs on render
    const getJobs = async () => {
      try {
        const jobsSnapshot = await getDocs(collection(db, "jobs"));
        const fetchedJobs = [];
        jobsSnapshot.forEach((job) => {
          fetchedJobs.push({ docId: job.id, ...job.data() });
        });
        setJobs(
          fetchedJobs.filter(
            (job) => job.isClosed === false || job.isClosed === undefined
          )
        );
      } catch (err) {
        console.log("Error while fetching jobs: " + err);
      }
    };

    getJobs();
  }, []);

  useEffect(() => {
    // fetch editor
    const uid = lsEditor?.user ? lsEditor?.user?.uid : lsEditor?.uid;
    console.log("UID: ", uid);

    const getEditor = async () => {
      const editorQuery = query(
        collection(db, "editor"),
        where("docId", "==", uid)
      );
      try {
        const editorSnapshot = await getDocs(editorQuery);
        editorSnapshot.forEach((doc) => {
          setEditor(doc.data());
        });
      } catch (err) {
        console.log("Error while fetching editor: ", err);
      }
    };

    getEditor();
  }, [jobs]);

  console.log("JOBS: ", jobs);
  console.log("Editor: ", editor);

  // filter jobs depending on editor company
  const filteredJobs = jobs.filter((job) => {
    return role === "editor" ? job?.company_name === editor?.company : job;
  });

  console.log("FILTERED JOBS: ", filteredJobs);

  return (
    <div>
      <Navigation />
      {(role && role === "editor") || (role && role === "admin") ? (
        <CreateJob />
      ) : (
        ""
      )}
      {jobs?.length < 1 ? (
        <CircularIndeterminate />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {filteredJobs?.map((job) => (
            <Box
              key={job.docId}
              sx={{
                width: "47%",
                padding: "2rem 0",
                borderBottom: "2px solid black",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  style={{ marginLeft: "2rem" }}
                  width={250}
                  height={160}
                  src={getLogos(job?.company_name)}
                  alt="logo"
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography
                    sx={{ ml: "2rem", fontSize: "1.5rem", fontWeight: "500" }}
                  >
                    {job?.company_name}
                  </Typography>
                  <Typography
                    sx={{ ml: "2rem", mt: "0.2rem", fontStyle: "italic" }}
                  >
                    {job?.type}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ ml: "2rem" }}>
                <Box
                  sx={{ display: "flex", mb: ".8rem", alignItems: "center" }}
                >
                  <Typography sx={{ fontWeight: "bold", mr: "4rem" }}>
                    {job?.role}
                  </Typography>
                  <Tooltip title="Number of applications">
                    <PeopleIcon />
                  </Tooltip>
                  <Typography sx={{ fontSize: "0.8rem" }}>
                    {job.count}
                  </Typography>
                </Box>
                {job?.description?.map((desc) => (
                  <Box
                    key={desc}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <RemoveIcon />
                    <Typography>{desc}</Typography>
                  </Box>
                ))}
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}
              >
                <Apply />
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </div>
  );
}

export default Jobs;
