import express from "express";
import { newAgency } from "../controllers/agency-controller.js";
import { upload } from "../middlewares/multer.js";

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

export default router;
