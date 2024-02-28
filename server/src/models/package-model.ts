import mongoose from "mongoose";

const travelPackageSchema = new mongoose.Schema(
  {
    packageName: {
      type: String,
      required: [true, "Please enter Package Name"],
    },
    packageOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agency",
      required: true,
    },
    packageCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    packageImages: {
      type: [String],
      default: null,
    },
    duration: {
      type: Number,
      required: [true, "Please enter number of days"],
    },
    departure: {
      type: String,
      required: [true, "Please enter location of departure"],
    },
    destination: {
      type: [String],
      required: [true, "Please enter travel package destination locations"],
    },
    transportation: {
      type: String,
      enum: ["Plane", "Bus", "Car", "Train", "Boat"],
      default: "Plane",
    },
    hotelDetails: {
      type: [
        {
          name: {
            type: String,
            required: [true, "Please enter the focal person name"],
          },
          stars: {
            type: Number,
            default: 1,
          },
        },
      ],
      default: null,
    },
    departureDate: {
      type: Date,
      required: [true, "Please enter Date of departure"],
    },
    returnDate: {
      type: Date,
      required: [true, "Please enter Date of return"],
    },
    price: {
      type: Number,
      required: [true, "Please enter package price"],
    },
    mealInfo: {
      type: String,
      default: null,
    },
    numberOfPeople: {
      type: Number,
      required: [true, "Please provide number of people in holiday package"],
    },
    focalPersons: {
      type: [
        {
          name: String,
          phoneNumber: String,
        },
      ],
      required: [
        true,
        "Please provide details of people to whom to contact with",
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const Package = mongoose.model("Package", travelPackageSchema);
