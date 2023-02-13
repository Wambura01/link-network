import React, { useState, useEffect } from "react";

import Navigation from "../Navigation/navigation";

import Safaricom from "../../Assets/saf-logo.png";
import Kwara from "../../Assets/kwara-logo.png";
import Microsoft from "../../Assets/ms-logo.jpg";
import Sendy from "../../Assets/sendy-logo.png";
import Twiga from "../../Assets/twiga-logo.png";
import Blank from "../../Assets/blank.png";

import { Box, Typography, Tooltip } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

import Apply from "../Jobs/apply";

function Jobs() {
  const [jobs, setJobs] = useState([]);

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
    // fetch jobs on render
    const getJobs = () => {
      const url = `http://localhost:3002/jobs`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setJobs(data));
    };

    getJobs();
  }, []);

  console.log("JOBS: ", jobs);

  return (
    <div>
      <Navigation />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {jobs.map((job) => (
          <Box
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
                src={getLogos(job.company_name)}
                alt="logo"
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{ ml: "2rem", fontSize: "1.5rem", fontWeight: "500" }}
                >
                  {job.company_name}
                </Typography>
                <Typography
                  sx={{ ml: "2rem", mt: "0.2rem", fontStyle: "italic" }}
                >
                  {job.type}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ ml: "2rem" }}>
              <Box sx={{ display: "flex", mb: ".8rem", alignItems: "center" }}>
                <Typography sx={{ fontWeight: "bold", mr: "4rem" }}>
                  {job.role}
                </Typography>
                <Tooltip title="Number of applications">
                  <PeopleIcon />
                </Tooltip>
                <Typography sx={{ fontSize: "0.8rem" }}>{job.count}</Typography>
              </Box>
              <Typography>{job.description}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: "2rem" }}>
              <Apply />
            </Box>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default Jobs;
