import express from "express"
import { getAllCategories, newCategory } from "../controllers/category-controller.js"

const router = express.Router()

// route - /api/v1/category/all
router.route("/all").get(getAllCategories)

//secure routes
// route - /api/v1/category/new
router.route("/new").post(newCategory)

export default router