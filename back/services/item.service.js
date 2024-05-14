const ItemModel = require("../models/item.model");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("sequelize");

exports.createItem = (item, userId, imagePath) => {
  return ItemModel.create({
    uuid: uuidv4(),
    name: item.name,
    description: item.description,
    status: "Active", // Lost - Found - Active
    image: imagePath,
    category: item.category,
    user_id: userId,
  });
};

exports.findAllItems = () => {
  return ItemModel.findAll();
};

exports.findItemById = (id) => {
  return ItemModel.findByPk(id);
};

exports.updateItem = (item, id, imageFilename) => {
  return ItemModel.update(
    {
      name: item.name,
      description: item.description,
      category: item.category,
      image: imageFilename,
    },
    {
      where: {
        id: id,
      },
    }
  );
};

exports.updateItemStatus = (id, status) => {
  return ItemModel.update(
    {
      status: status,
    },
    {
      where: {
        id: id,
      },
    }
  );
};

exports.deleteItem = (id) => {
  return ItemModel.destroy({
    where: {
      id: id,
    },
  });
};

exports.findItemsByUserId = (userId) => {
  return ItemModel.findAll({
    where: {
      user_id: userId,
    },
  });
};

exports.getStats = (userId) => {
  return ItemModel.findAll({
    attributes: [[sequelize.fn("count", sequelize.col("status")), "count"], "status"],
    where: {
      user_id: userId,
    },
    group: ["status"],
  });
};

exports.findItemByUUID = (uuid) => {
  return ItemModel.findOne({
    where: {
      uuid: uuid,
    },
  });
};
