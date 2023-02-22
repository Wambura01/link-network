import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import { Button } from "@mui/material";
import { getFirstLetter, getInitials } from "../../Utils/getInitials";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [role, setRole] = useState(null);

  console.log("USER", user);

  const auth = getAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setUser(
      JSON.parse(localStorage.getItem("user"))
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.getItem("user")
    );
    setRole(localStorage.getItem("role"));
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => {
        // After successful sign-out .
        localStorage.clear();
        navigate("/choice", { replace: true });
      })
      .catch((error) => {
        // an error happened.
        console.log("Error while logging out!", error);
      });
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          marginRight: "2rem",
        }}
      >
        <Tooltip title="Account" arrow>
          <IconButton
            onClick={handleClick}
            size="small"
            textAlign="right"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 45, height: 45, display: "flex" }}>
              <Typography
                sx={{
                  backgroundColor: "black",
                  padding: "0.7rem",
                  borderRadius: "50pc",
                  fontFamily: "Rubik, sans-serif",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                {user?.user
                  ? user?.user?.displayName
                    ? getInitials(user?.user?.displayName)
                    : getFirstLetter(user?.user?.email)
                  : user?.[0]
                  ? user?.[0]?.displayName
                    ? getInitials(user?.[0]?.displayName)
                    : getFirstLetter(user?.email)
                  : user
                  ? user?.displayName
                    ? getInitials(user?.displayName)
                    : getFirstLetter(user?.email)
                  : ""}
              </Typography>
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Typography
            sx={{
              backgroundColor: "black",
              padding: "0.7rem",
              borderRadius: "50pc",
              fontFamily: "Rubik, sans-serif",
              fontWeight: "700",
              color: "white",
            }}
          >
            {user?.user
              ? getInitials(user?.user?.displayName)
              : user?.[0]
              ? getInitials(user?.[0]?.displayName)
              : getFirstLetter(user?.email)}
          </Typography>
          <Box sx={{ marginLeft: "1rem" }}>
            <Typography
              sx={{
                color: "black",
                fontFamily: "Rubik, sans-serif",
                fontWeight: "700",
                fontSize: "14px",
                textAlign: "right",
              }}
            >
              {user?.[0]
                ? user?.[0]?.displayName
                : user?.user
                ? user?.user?.displayName
                : user?.displayName}
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontFamily: "Rubik, sans-serif",
                fontWeight: "400",
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              {user?.[0]
                ? user?.[0]?.email
                : user?.user
                ? user?.user?.email
                : user?.email}
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontFamily: "Rubik, sans-serif",
                fontWeight: "400",
                fontSize: "12px",
                textAlign: "right",
                fontStyle: "italic",
              }}
            >
              {role}
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Button fullWidth color="error" variant="contained" onClick={logout}>
            Logout
          </Button>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
