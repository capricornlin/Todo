// import Home from "./Pages/Home";
import Home from "./Page/Home";
import Complete from "./Page/Complete";
import Priority from "./Page/Priority";

const routes = [
  {
    path: "/",
    element: <Home />,
    children: [],
  },
  {
    path: "/Complete",
    element: <Complete />,
    children: [],
  },
  {
    path: "/Priority",
    element: <Priority />,
    children: [],
  },
];

export default routes;
