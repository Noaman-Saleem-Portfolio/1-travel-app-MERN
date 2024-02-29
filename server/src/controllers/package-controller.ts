import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import { Package } from "../models/package-model.js";
import { MyUserRequest } from "../types/types.js";
import { Category } from "../models/category-model.js";

//////////////////////////////
//// Create New Holiday Package
//////////////////////////////
export const newPackage = TryCatch(
  async (req: MyUserRequest, res: Response, next: NextFunction) => {
    //get package details from frontend
    const {
      packageName,
      packageOwner,
      packageCategory,
      duration,
      departure,
      destination,
      transportation,
      hotelDetails,
      departureDate,
      returnDate,
      price,
      mealInfo,
      numberOfPeople,
      focalPersons,
    } = req.body;

    // One way of sending an array in FormData is to serialize it:

    // completeFormData.append("positionHeld", JSON.stringify(formData.positionHeld));
    // Then, on the backend, you can parse it with JSON.parse()

    if (
      !packageName ||
      // !packageOwner ||
      !packageCategory ||
      !duration ||
      !departure ||
      !destination ||
      !departureDate ||
      !returnDate ||
      !price ||
      !numberOfPeople ||
      !focalPersons
    ) {
      return next(new ErrorHandler("Please enter All Fields", 400));
    }

    const category = await Category.findById(packageCategory);
    if (!category) {
      return next(
        new ErrorHandler("Package Category ID does not exists in DB", 400)
      );
    }

    const newlyPackage = await Package.create({
      packageName,
      packageOwner: req.user._id,
      packageCategory: category?._id,
      duration,
      departure,
      destination,
      transportation,
      hotelDetails,
      departureDate,
      returnDate,
      price,
      mealInfo,
      numberOfPeople,
      focalPersons,
    });

    //confirmation
    const createdPackage = await Package.findById(newlyPackage._id);

    if (!createdPackage) {
      return next(
        new ErrorHandler(
          "Something went wrong while creating new holiday package",
          500
        )
      );
    }

    return res.status(200).json({
      success: true,
      message: `New Holiday Package has been created`,
      createdPackage,
    });
  }
);

//////////////////////////////
// Upload Package Images
//how to resolve file not being uploaded on postman issue
//https://stackoverflow.com/questions/60036239/upload-file-failed-postman
//////////////////////////////
export const updatePackageImages = TryCatch(
  async (req: MyUserRequest, res: Response, next: NextFunction) => {

    const {packageId} = req.body;

    //reading uploaded files
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };
    // console.log(files);
    // console.log(files.packageImages);
    //if files.packageImages === undefined
    if(!files.packageImages){
      return next(new ErrorHandler("No image uploaded", 400));
    }
    //saving files path into an array
    const imagesArray : string[] = files.packageImages.map((item) => item.path);
    console.log(imagesArray);

    const foundPackage = await Package.findById(packageId);
    // console.log(foundPackage);
    

    if (!foundPackage) {
      return next(new ErrorHandler("No associated Package found in DB", 400));
    }
    
     //checking if packageImages already exist if yes then push them into new updated images array
     if(foundPackage?.packageImages.length > 0){
      foundPackage?.packageImages.map((i) => {
        console.log(i);
        return imagesArray.push(i)
      })
     }

     
    const updatedPackage = await Package.findByIdAndUpdate(
      foundPackage._id,
      {
        $set: {
          packageImages: imagesArray,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Package images updated successfully",
      updatedPackage,
    });
  }
); 
