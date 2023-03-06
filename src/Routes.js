import { useRoutes } from "react-router-dom";
import AdminsList from "./Components/Admins/adminList";
import EditorsList from "./Components/Editors/editorsList";
import JobsList from "./Components/Jobs/jobsList";
import Choice from "./Components/Login/choice";

import Login from "./Components/Login/login";
import Register from "./Components/Login/register";
import RegisterAdmin from "./Components/Login/registerAdmin";
import RegisterEditor from "./Components/Login/registerEditor";
import Homepage from "./Components/Pages/Homepage";
import Jobs from "./Components/Pages/Jobs";
import Portal from "./Components/Portal/portal";
import StudentsList from "./Components/Students/studentsList";

const Routes = () => {
  const routes = useRoutes([
    { path: "choice", element: <Choice /> },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "register-editor",
      element: <RegisterEditor />,
    },
    {
      path: "register-admin",
      element: <RegisterAdmin />,
    },
    { path: "/", element: <Homepage /> },
    { path: "jobs", element: <Jobs /> },
    {
      path: "portal",
      element: <Portal />,
      children: [
        {
          path: "jobs-list",
          element: <JobsList />,
        },
        {
          path: "admins-list",
          element: <AdminsList />,
        },
        {
          path: "students-list",
          element: <StudentsList />,
        },
        {
          path: "editors-list",
          element: <EditorsList />,
        },
      ],
    },
  ]);

  return routes;
};

export default Routes;
