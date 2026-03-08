const express=require("express");
const register=require("../controllers/register");
const login=require("../controllers/login");
const logout=require("../controllers/logout");
const deleteAccount = require("../controllers/deleteAccount");
const authMiddleware = require("../middleware/authMiddleware");
const profile=require("../controllers/profile");
const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.delete("/logout",logout);
router.delete("/deleteAccount/:id",authMiddleware,deleteAccount)
router.get("/profile",authMiddleware,profile)

module.exports=router;

