const { Router } = require("express");
const router = Router();
const userCtrl = require("../controllers/userController");

router.get("/", userCtrl.findAll);
router.post("/register", userCtrl.register);
module.exports = router;
