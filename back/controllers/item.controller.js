const ItemService = require("../services/item.service");

exports.getAll = async (req, res) => {
  try {
    const items = await ItemService.findAllItems();
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMyItems = async (req, res) => {
  try {
    // get connected user's id
    const userId = req.user.id;
    const items = await ItemService.findItemsByUserId(userId);
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await ItemService.findItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }
    return res.json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const connectedUserId = req.user.id;
    const item = await ItemService.createItem(req.body, connectedUserId, req.file.filename);
    return res.json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await ItemService.findItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }
    await ItemService.updateItem(req.body, req.params.id, req.file.filename);
    return res.json({ message: "Item updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await ItemService.findItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }
    await ItemService.deleteItem(req.params.id);
    return res.json({ message: "Item deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const item = await ItemService.findItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }
    await ItemService.updateItemStatus(req.params.id, req.body.status);
    return res.json({ message: "Item status updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const stats = await ItemService.getStats(userId);
    return res.json(stats);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUUID = async (req, res) => {
  try {
    const item = await ItemService.findItemByUUID(req.params.uuid);
    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }
    return res.json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};