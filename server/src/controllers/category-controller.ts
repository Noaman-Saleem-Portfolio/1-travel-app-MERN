


import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewCategoryRequestBody } from "../types/types.js";
import { Category } from "../models/category-model.js";
import ErrorHandler from "../utils/utility-class.js";


//////////////////////////////
//// Create New Category
//////////////////////////////
export const newCategory = TryCatch(
    async (
      req: Request<{}, {}, NewCategoryRequestBody>,
      res: Response,
      next: NextFunction
    ) => {
        const {categoryName} = req.body;

        const category = await Category.create({
            categoryName
        })

        //confirmation
        const createdCategory = await Category.findById(category._id)
      
          if (!createdCategory) {
            return next(
              new ErrorHandler("Something went wrong while registering new Category", 500)
            );
          }

          //sending response
          return res.status(200).json({
            success: true,
            message: `New Category Successfully Created`,
          });
    })

//////////////////////////////
//// Get All Categories
//////////////////////////////
export const getAllCategories = TryCatch(
    async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
        const categories = await Category.find({})

        const count = categories.length

        return res.status(200).json({
            success:true,
            count,
            categories
        })
    })