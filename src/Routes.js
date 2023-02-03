import { useRoutes } from "react-router-dom";

import Login from "./Components/Login/login";
import Register from "./Components/Login/register";
import Homepage from "./Components/Pages/Homepage";
import Jobs from "./Components/Pages/Jobs";

const Routes = () => {
  const routes = useRoutes([
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    { path: "/", element: <Homepage /> },
    { path: "jobs", element: <Jobs /> },
  ]);

  return routes;
};

export default Routes;
