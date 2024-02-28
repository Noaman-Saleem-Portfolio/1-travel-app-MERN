import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import { Package } from "../models/package-model.js";

//////////////////////////////
//// Create New Holiday Package
//////////////////////////////
export const newPackage = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
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
      !packageOwner ||
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

    const newlyPackage = await Package.create({
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
