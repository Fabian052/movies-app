const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Director = sequelize.define("director", {
  firstName: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

module.exports = Director;
