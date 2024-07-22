const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("", controller.getAll);
router.get("/:id", controller.getById);
router.post("", controller.create);
router.delete("/:id", controller.deleteOne);
router.put("/:id", controller.updateOne);



module.exports = router;
