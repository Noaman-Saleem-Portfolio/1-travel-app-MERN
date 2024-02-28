import express from "express";
import {
  newPackage,
  updatePackageImages,
} from "../controllers/package-controller.js";
import { verifyJWT } from "../middlewares/auth-agency-middleware.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

// route - /api/v1/package/new
router.route("/new").post(verifyJWT, newPackage);

// route - /api/v1/package/add-images
router.route("/add-images").post(
  verifyJWT,
  upload.fields([
    {
      name: "packageImages",
      maxCount: 3,
    },
  ]),
  updatePackageImages
);

export default router;
