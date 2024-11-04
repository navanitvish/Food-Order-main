import React from "react";
import Login from "./login/Login";
import Acc from "./acc/Acc";
import Otp from "./otp/Otp";
import CorrectPassword from "./correctPass/CorrectPassword";

interface RegisterProps {
  toggleOtp: () => void;

  returnToHome: () => void;

  toggleAcc: () => void;
  toggleLogin: () => void;

  toggleCorrectPassword: () => void;

  loginAcc: boolean;
  sideOtp: boolean;
  createAcc: boolean;
  isPassCorrect: boolean;
}

const RegisterForm: React.FC<RegisterProps> = ({
  toggleOtp,
  toggleAcc,
  toggleLogin,
  returnToHome,
  loginAcc,
  sideOtp,
  createAcc,
  toggleCorrectPassword,
  isPassCorrect,
}) => {
  return (
    <div
      onClick={returnToHome}
      className="fixed inset-0 z-40 flex justify-end bg-black/30"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={` bg-white h-full lg:w-[28rem] w-[20rem]  duration-500 
            `}
      >
        {loginAcc && (
          <Login
            toggleOtp={toggleOtp}
            toggleAcc={toggleAcc}
            exit={returnToHome}
            toggleCorrectPassword={toggleCorrectPassword}
          />
        )}
        {sideOtp && <Otp toggleOtp={toggleOtp} returnToHome={returnToHome} />}
        {createAcc && (
          <Acc
            toggleLogin={toggleLogin}
            toggleOtp={toggleOtp}
            exit={returnToHome}
          />
        )}
        {isPassCorrect && (
          <CorrectPassword
            toggleCorrectPassword={toggleCorrectPassword}
            exit={returnToHome}
          />
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
