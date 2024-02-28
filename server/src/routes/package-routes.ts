import express from "express";
import { newPackage } from "../controllers/package-controller.js";
import { verifyJWT } from "../middlewares/auth-agency-middleware.js";

const router = express.Router();

// route - /api/v1/package/new
router.route("/new").post(verifyJWT, newPackage);

export default router;
