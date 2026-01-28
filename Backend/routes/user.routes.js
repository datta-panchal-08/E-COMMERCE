import express from 'express';
import { changePassword, forgoPassword, getallUsers, login, logout, register, reVerify, verify, verifyOTP } from '../controllers/user.controller.js';
import { isAdmin, isAuthenticated } from '../middlewares/isAuthenticated.js';
const router = express.Router();


router.post("/register",register);

router.post("/verify",verify);

router.post("/reverify",reVerify);

router.post("/login",login);

router.post("/forgot-password",isAuthenticated,forgoPassword);

router.post("/verify-otp/:email",verifyOTP);
router.post("/change-password/:email",changePassword)
router.post("/logout",isAuthenticated,logout)

// Get Requests
router.get("/all-users",isAuthenticated,isAdmin,getallUsers);
router.get("/get-user/:userId",isAuthenticated,getUserById);

export  default router