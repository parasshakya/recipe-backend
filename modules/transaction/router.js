const express = require("express");
const router = express.Router();

const controller = require("./controller");
const{verifyUser} = require("../authentication/auth.middleware");

router.get("", verifyUser, controller.getAll);
router.get("/:id", verifyUser, controller.getById);
router.post("", verifyUser, controller.create);
router.delete("/:id", verifyUser, controller.deleteOne);
router.put("/:id", verifyUser, controller.updateOne);


router.get("/category/:category", verifyUser, controller.getByCategory);
router.get("/account/:account",verifyUser ,controller.getByAccount);
router.get("/greaterthan/:amount", verifyUser,controller.getGreaterThan);
router.get("/lessthan/:amount", verifyUser, controller.getLessThan);

module.exports = router;
