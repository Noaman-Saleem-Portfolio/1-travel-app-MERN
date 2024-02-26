import express from "express";
import {
  changeCurrentPassword,
  loginAgency,
  logoutAgency,
  newAgency,
  refreshAccessToken,
} from "../controllers/agency-controller.js";
import { upload } from "../middlewares/multer.js";
import { verifyJWT } from "../middlewares/auth-agency-middleware.js";

const router = express.Router();

// route - /api/v1/agency/new
// router.post("/new", newAgency);
router.route("/new").post(
  upload.fields([
    {
      name: "companyLogo",
      maxCount: 1,
    },
  ]),
  newAgency
);

// route - /api/v1/agency/login
router.route("/login").post(loginAgency);

//secure routes
// route - /api/v1/agency/logout
router.route("/logout").post(verifyJWT, logoutAgency);

// route - /api/v1/agency/refresh-token
router.route("/refresh-token").post(refreshAccessToken)
// route - /api/v1/agency/change-password
router.route("/change-password").post(verifyJWT, changeCurrentPassword)


export default router; 
