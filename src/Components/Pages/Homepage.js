import React from "react";

import Navigation from "../Navigation/navigation";

import { Box, Button, Typography } from "@mui/material";

import landing from "../../Assets/landing.jpg";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <Navigation />
      <Box
        id="home"
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
        }}
      >
        <Box
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-duration="1500"
          data-aos-easing="ease-in-sine"
          sx={{
            width: "38%",
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            data-aos="fade-right"
            data-aos-offset="300"
            data-aos-duration="2500"
            data-aos-easing="ease-in-sine"
            sx={{
              padding: "10.95rem 4rem",
              color: "white",
              textAlign: "left",
              fontSize: "4.5rem",
            }}
          >
            Make Things Possible with Us...
          </Typography>
        </Box>
        <Box sx={{ width: "62%", height: "85vh" }}>
          <img
            style={{ width: "100%", height: "100%" }}
            src={landing}
            alt="Landing Background"
          />
        </Box>
      </Box>
      <Box
        id="about"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "7rem 0",
        }}
      >
        <Box>
          <Typography
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="1500"
            sx={{
              fontSize: "3rem",
              borderBottom: "5px solid black",
            }}
          >
            About Us.
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="3000"
            sx={{
              width: "94%",
              padding: "5rem 0",
              textAlign: "center",
              fontSize: "4.7rem",
              color: "black",
            }}
          >
            Whether you are looking for an internship, entry-level position or
            just want to explore what career your field has to offer,{" "}
            <span
              style={{
                textAlign: "center",
                fontSize: "4.5rem",
                color: "gray",
                fontStyle: "italic",
                textDecoration: "underline",
              }}
            >
              Link Network
            </span>{" "}
            has a program for you...
          </Typography>
        </Box>
      </Box>
      <Box
        id="jobs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "7rem 0",
          backgroundColor: "black",
        }}
      >
        <Box>
          <Typography
            data-aos="zoom-in-down"
            data-aos-duration="1500"
            sx={{
              fontSize: "3rem",
              borderBottom: "5px solid white",
              color: "white",
            }}
          >
            Jobs.
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            data-aos="zoom-in"
            data-aos-duration="2000"
            sx={{
              width: "90%",
              padding: "5rem 0",
              color: "white",
              textAlign: "center",
              fontSize: "1.5rem",
            }}
          >
            Want to explore a career with us?
          </Typography>
          <Box>
            <Link style={{ textDecoration: "none" }} to="/jobs">
              <Button
                data-aos="fade-down"
                data-aos-duration="2000"
                sx={{
                  color: "white",
                  padding: ".5rem 4rem",
                  border: "2px solid white",
                  "&:hover": {
                    fontWeight: "bold",
                    backgroundColor: "white",
                    border: "2px solid gray",
                    color: "black",
                  },
                }}
              >
                Apply Now
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Homepage;
