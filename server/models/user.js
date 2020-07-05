"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "First Name is required",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Last Name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
        },
      },
      mobileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
        validate: {
          notEmpty: {
            msg: "Mobile Number is required",
          },
        },
      },
      dateOfBirth: DataTypes.DATEONLY,
      gender: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      indexes: [
        {
          unique: true,
          fields: ["email", "mobileNumber"],
        },
      ],
    }
  );
  return User;
};
