import GroupIcon from "@mui/icons-material/Group";
import AttributionIcon from "@mui/icons-material/Attribution";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import WorkIcon from "@mui/icons-material/Work";

const sidebarConfig = [
  {
    title: "jobs-list",
    path: "/portal/jobs-list",
    label: "Jobs",
    icon: <WorkIcon />,
  },
  {
    title: "admins",
    path: "/portal/admins-list",
    label: "Admins",
    icon: <AdminPanelSettingsIcon />,
  },
  {
    title: "students",
    path: "/portal/students-list",
    label: "Students",
    icon: <GroupIcon />,
  },

  {
    title: "Editors",
    path: "/portal/editors-list",
    label: "Editors",
    icon: <AttributionIcon />,
  },
];

export default sidebarConfig;
