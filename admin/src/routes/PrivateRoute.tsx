import Layout from "../layout/Layout";
import { Navigate, useLocation } from "react-router";
import { baseRoute, roleBasedRoutes } from "./routes";

type UserRole = keyof typeof roleBasedRoutes;

const PrivateRoute = () => {
  const location = useLocation();
  // const isAuthenticated = !!localStorage.getItem("admin");
  const isAuthenticatedValue = localStorage.getItem("admin");

  const isValidToken =
    isAuthenticatedValue && !isTokenExpired(isAuthenticatedValue);

  if (!isValidToken) {
    return <Navigate to="/login" />;
  }

  const decodedToken = JSON.parse(atob(isAuthenticatedValue.split(".")[1]));
  const userRole = decodedToken?.role as UserRole;

  const allowedRoutes = roleBasedRoutes[userRole] || [];

  const currentPath = location.pathname;
  const isAllowed = allowedRoutes.some((route: string) =>
    currentPath.startsWith(route)
  );

  console.log(userRole, baseRoute[userRole]);

  if (!isAllowed) {
    return <Navigate to={baseRoute[userRole] || "/"} />;
  }

  return <Layout />;
};

// Helper function to check if token is expired
function isTokenExpired(token: string) {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    const expirationBuffer = 60;
    console.log(currentTime, decodedToken, decodedToken.exp < currentTime);
    return decodedToken.exp < currentTime + expirationBuffer;
  } catch (error) {
    return true;
  }
}

export default PrivateRoute;
