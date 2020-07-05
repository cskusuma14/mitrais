const { User } = require("../models");
const user = require("../models/user");

class Users {
  static findAll(req, res) {
    User.findAll()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static register(req, res) {
    let newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
    };
    User.create(newUser)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        if (err.name == "SequelizeValidationError") {
          res.status(400).json({
            message: err.errors[0].message,
          });
        } else if (err.name == "SequelizeUniqueConstraintError") {
          res.status(400).json({
            message: err.errors[0].message,
          });
        } else {
          console.log(err);
          res.status(500).json({ message: "internal server error" });
        }
      });
  }
}

module.exports = Users;
