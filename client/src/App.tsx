import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Terms from "./components/terms/Terms";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import NewCart from "./pages/NewCart";
import NewSearch from "./pages/NewSearch";
import NewDishList from "./pages/NewDishList";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "home", element: <Home /> },

        { path: "search", element: <NewSearch /> },
        { path: "search/:id/:name", element: <NewDishList /> },

        // { path: "search", element: <Search /> },
        // { path: "search/:id", element: <DishList /> },

        // { path: "productcard", element: <Cart /> },
        { path: "productcard", element: <NewCart /> },
        { path: "terms", element: <Terms /> },
      ],
    },
    { path: "forgot-password", element: <ForgotPassword /> },
    { path: "update-password", element: <UpdatePassword /> },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
