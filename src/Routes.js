import { useRoutes } from "react-router-dom";
import Choice from "./Components/Login/choice";

import Login from "./Components/Login/login";
import Register from "./Components/Login/register";
import RegisterAdmin from "./Components/Login/registerAdmin";
import RegisterEditor from "./Components/Login/registerEditor";
import Homepage from "./Components/Pages/Homepage";
import Jobs from "./Components/Pages/Jobs";

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
  ]);

  return routes;
};

export default Routes;
