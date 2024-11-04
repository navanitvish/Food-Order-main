// const generateOTP = () => {
//   const otp = Math.floor(1000 + Math.random() * 9000)
//     .toString()
//     .slice(0, 4);
//   return otp;
// };

// module.exports = {
//   generateOTP,
// };


const crypto = require("node:crypto");

const generateOTP = () => {
  const otp = crypto.randomInt(100000, 999999).toString();
  return otp;
};

module.exports = { generateOTP };
