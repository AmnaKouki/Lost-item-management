const express = require("express");
const router = express.Router();
const multer = require("multer"); //library for file upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
const AuthController = require("../controllers/auth.controller");
const ItemController = require("../controllers/item.controller");
const ErrorHandler = require("../middleware/error.middleware");
const AuthGuard = require("../middleware/auth.middleware");
const schema = require("../validatons/auth.validation");
const validate = require("../utils/validator.util");

// --- Auth ---
router.post("/register", validate(schema.register), ErrorHandler(AuthController.register));
router.post("/login", validate(schema.login), ErrorHandler(AuthController.login));
router.get("/user", AuthGuard, ErrorHandler(AuthController.getUser));
router.get("/logout", AuthGuard, ErrorHandler(AuthController.logout));

// --- Items ---
router.get("/items", ErrorHandler(ItemController.getAll));
router.get("/my-items", AuthGuard, ErrorHandler(ItemController.getMyItems));
router.get("/items/:id", ErrorHandler(ItemController.getOne));
router.post("/items", AuthGuard, upload.single("image"), ErrorHandler(ItemController.create));
router.put("/items/:id", AuthGuard, upload.single("image"), ErrorHandler(ItemController.update));
router.put("/item-status/:id", AuthGuard, ErrorHandler(ItemController.updateStatus));
router.delete("/items/:id", AuthGuard, ErrorHandler(ItemController.delete));
router.get("/stats", AuthGuard, ErrorHandler(ItemController.getStats));
router.get("/uuid/:uuid", ErrorHandler(ItemController.getUUID));

// --- Files ---
router.use("/uploads", express.static("uploads"));

router.all("*", (req, res) => res.status(400).json({ message: "Bad Request." }));

module.exports = router;
