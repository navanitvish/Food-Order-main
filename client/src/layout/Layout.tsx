import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import NavBar from "../components/nav/NavBar";

import RegisterForm from "../components/signIn/RegisterForm";
import { useSelector } from "react-redux";
import { checkoutHelper } from "../app-store/checkoutLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const proceedToLogin = useSelector(checkoutHelper);
  const [sideOtp, setSideOtp] = useState<boolean>(false);
  const [isPassCorrect, setCorrectPassword] = useState<boolean>(false);
  const [createAcc, setCreateAcc] = useState<boolean>(false);
  const [loginAcc, setLoginAcc] = useState<boolean>(false);

  const toggleSidebar = (value: string) => {
    console.log(value, "fromLayout");
    // setSidebarOpen((prev) => !prev);
    if (value !== "login") {
      setCreateAcc(true);
      setLoginAcc(false);
      // setLoginAcc(true);
      setSidebarOpen(true);
    } else {
      // setCreateAcc(true);
      setLoginAcc(true);
      setCreateAcc(false);

      setSidebarOpen(true);
    }
  };

  const toggleOtp = () => {
    setSideOtp((prev) => !prev);
    setCreateAcc((prev) => !prev);
  };

  const toggleCorrectPassword = () => {
    setCorrectPassword((prev) => !prev);
    // if (loginAcc) {
    setLoginAcc((prev) => !prev);
    // }
  };

  const toggleAcc = () => {
    setCreateAcc((prev) => !prev);
    if (loginAcc) {
      setLoginAcc((prev) => !prev);
    }
  };

  const toggleLogin = () => {
    setLoginAcc((prev) => !prev);
    if (createAcc) {
      setCreateAcc((prev) => !prev);
    }
  };

  const returnToHome = () => {
    setSidebarOpen(false);
    setSideOtp(false);
  };

  console.log(sideOtp, loginAcc, createAcc);

  useEffect(() => {
    if (proceedToLogin) {
      setSidebarOpen(true);
      setLoginAcc(true);
      setCreateAcc(false);
      setSideOtp(false);
      setCorrectPassword(false);
    }
  }, [proceedToLogin]);

  useEffect(() => {
    if (location.pathname === "/") navigate("/home");
  }, [navigate]);

  console.log(isPassCorrect);

  return (
    <main className="w-screen h-screen ">
      <ToastContainer />
      {sidebarOpen && (
        <RegisterForm
          toggleOtp={toggleOtp}
          toggleAcc={toggleAcc}
          toggleLogin={toggleLogin}
          returnToHome={returnToHome}
          loginAcc={loginAcc}
          sideOtp={sideOtp}
          createAcc={createAcc}
          toggleCorrectPassword={toggleCorrectPassword}
          isPassCorrect={isPassCorrect}
          // processeTologin={proceedToLogin}
        />
      )}
      <header>
        <NavBar toggleSidebar={toggleSidebar} />
      </header>
      <div className="pt-[6rem] ">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
