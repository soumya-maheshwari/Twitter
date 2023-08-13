const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/userModel");
const { ErrorHandler } = require("../middleware/ErrorHandler");
const { validatepassword, validatemail } = require("../utils/validations");

const home = (req, res, next) => {
  const data = {
    msg: "welcome",
  };
  try {
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACCESS_KEY, { expiresIn: "7d" });
};

const refreshToken = (req, res, next) => {
  try {
    const rf_token = req.body.refreshtoken;

    if (!rf_token)
      return next(new ErrorHandler(400, "Please Login or Register"));

    jwt.verify(rf_token, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) return next(new ErrorHandler(401, "Invalid Authentication"));
      const accessToken = createAccessToken({
        id: user._id,
      });
      return res.status(200).json({ accessToken });
    });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

const login = async (req, res, next) => {
  try {
    //    Destructuring email and password from body
    let { email, password } = req.body;
    email = email.toLowerCase();

    if (!(email && password)) {
      return next(new ErrorHandler(400, "email and password is required"));
    }

    // check for user in database
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return next(new ErrorHandler(404, "user not found"));
    }

    const result = await bcrypt.compare(password, user.password);

    // console.log(password);
    // console.log(user.password);
    if (!result) return next(new ErrorHandler(400, "Invalid Credentials"));

    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      id: user._id,
      success: true,
      msg: `WELCOME ${user.name} !! login successful`,
      user,
      accessToken,
      // refreshToken,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;

    const isUserExists = await User.findOne({ email: email.toLowerCase() });

    if (isUserExists) {
      return next(new ErrorHandler(400, "user by this email already exists"));
    }
    if (!(name && username && email && password)) {
      return next(new ErrorHandler(400, "All the input fields are required."));
    }
    if (!validatepassword(password)) {
      return next(
        new ErrorHandler(400, "incorrect password format is provided")
      );
    }
    if (!validatemail(email)) {
      return next(new ErrorHandler(400, "incorrect email format is provided"));
    }
    const isUserNameExists = await User.findOne({
      username: username.toLowerCase(),
    });

    if (isUserNameExists) {
      return next(new ErrorHandler(400, "this username already exists"));
    }
    const hashPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashPassword,
      username,
    });

    const savedUser = await user.save();
    // console.log(savedUser);
    if (user.verify == true) {
      return next(new ErrorHandler(400, "user by this email already exists"));
    }

    const accessToken = createAccessToken({ id: user._id });

    const refreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: "7d",
      }
    );
    return res.status(200).json({
      id: user._id,
      success: true,
      msg: `WELCOME ${name}  !! signup successful`,
      user,
      accessToken,
      // refreshToken,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const searchUser = async (req, res, next) => {
  try {
    const { search } = req.query;
    const user = await User.find({
      $or: [
        { username: { $regex: search, $options: "i" } }, // Case-insensitive username search
        { name: { $regex: search, $options: "i" } }, // Case-insensitive email search
      ],
    });

    res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = {
  home,
  login,
  signup,
  // accessToken,
  refreshToken,
  searchUser,
};
