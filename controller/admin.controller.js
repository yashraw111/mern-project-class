const { Admin } = require("../models/admin.model");
const { plainToHash, hashToPlain } = require("../utils/password");
const jwt = require("jsonwebtoken");
exports.signUp = async (req, res) => {
  try {
    const { a_username, a_email, a_password } = req.body;
    const existEmail = await Admin.findOne({ a_email });
    if (existEmail) {
      res.status(403).json({
        message: "Email Already Exist",
      });
    } else {
      const hashPass = await plainToHash(a_password);
      const admin = await Admin.create({
        a_username,
        a_email,
        a_password: hashPass,
      });

      if (admin) {
        res.status(201).json({
          success: true,
          message: "signup successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
exports.login = async (req, res) => {
  try {
    const { a_email, a_password } = req.body;

    const existEmail = await Admin.findOne({ a_email });

    if (existEmail) {
      // console.log("first")
      const admin = await Admin.findOne({ a_email });
      const match = await hashToPlain(a_password, admin.a_password);
      if (match) {
        const payload = {
          id: admin._id,
          role: admin.a_roleId,
        };
        const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
          expiresIn: "1h",
        });
        res.header({ token }).status(200).json({
          success: true,
          message: "Login Successfully",
          // payload:payload
        });
      } else {
        return res.status(403).json({
          message: "Incorrect Password",
        });
      }
    } else {
      res.status(403).json({
        message: "Email Not Exist",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
