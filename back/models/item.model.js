const { DataTypes } = require("sequelize");
const sequelize = require("./connection");

const Item = sequelize.define(
  "Item",
  {
    uuid: {
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
module.exports = Item;
