const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateUser, deleteUser, getUsers} = require("./Controllers/userController");
const authMiddleware = require("./Middleware/authMiddleware")
const { createAd , updateAd, deleteAd, getAds } = require("./Controllers/adController");

router.post("/register", registerUser, authMiddleware);
router.post("/login", loginUser, authMiddleware);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUser);
router.get("/users", authMiddleware, getUsers);

router.post("/ads", authMiddleware, createAd);
router.put("/ads/:id", authMiddleware, updateAd);
router.delete("/ads/:id", authMiddleware, deleteAd);
router.get("/adslist", authMiddleware, getAds);




module.exports = router;