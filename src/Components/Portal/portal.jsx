import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import sidebarConfig from "./sidebarConfig";

// material UI
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";

import Logo from "../../Assets/logo_.png";
import { getFirstLetter, getInitials } from "../../Utils/getInitials";
import { Avatar } from "@mui/material";
import AccountMenu from "../Account/account";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Portal() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  console.log("local User: ", user);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        sx={{
          backgroundColor: "#f2fffb",
          boxShadow: "none",
          borderBottom: "none",
        }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
              color: "black",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              color: "black",
              fontWeight: "700",
              fontFamily: "Rubik, sans-serif",
              fontSize: "24px",
            }}
            noWrap
            component="div"
          >
            Link Network Admin Portal
          </Typography>
          <Box
            sx={{
              position: "absolute",
              width: "18%",
              right: "0",
              paddingRight: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccountMenu />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <Box sx={{ width: "150px" }}>
                <img src={Logo} alt="logo" />
                <ChevronLeftIcon sx={{ ml: "4.1rem" }} />
              </Box>
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            "& li div span": {
              fontWeight: "400",
              fontFamily: "Rubik, sans-serif",
              fontSize: ".88rem",
            },
            "& li.Mui-selected": {
              backgroundColor: "black",
              color: "white",
            },
            "& li.Mui-selected div svg": {
              color: "white",
            },
            "& li.Mui-selected div span": {
              fontFamily: "Rubik, sans-serif",
              fontWeight: "700",
              fontSize: ".88rem",
              color: "white",
            },
          }}
        >
          {sidebarConfig.map((navItem) => (
            <ListItem
              key={navItem.title}
              disablePadding
              selected={navItem.path === pathname}
              sx={{
                display: "block",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
              onClick={() => navigate(navItem.path)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <Tooltip title={navItem.label} placement="right" arrow>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      "&:hover": {
                        color: "white",
                      },
                    }}
                  >
                    {navItem.icon}
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary={navItem.label}
                  sx={{
                    opacity: open ? 1 : 0,
                    "&:hover": {
                      color: "white",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ backgroundColor: "#f2fffb", flexGrow: 1, p: 3 }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
