const Driver = require('../models/driverSchema');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


const driverRegister = async (req, res) => {
  const { name, email, password, vehicleDetails, latitude, longitude } =
    req.body;
  try {
    let driver = await Driver.findOne({ email });
    if (driver) return res.status(400).json({ message: "Driver already exists" });

    driver = new Driver({
      name,
      email,
      mobile,
      password,
      vehicleDetails,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });

    await driver.save();

    res.json({ success:true, message:"Driver Created SuccessFully" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};


const driverLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const driver = await Driver.findOne({ email });
    if (!driver) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await driver.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    const token = await jwt.sign(
        { _id: user._id, role: user.role },
        process.env.SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

    res.json({ token });
  } catch (err) {
    res.status(500).send("Server error");
  }
};