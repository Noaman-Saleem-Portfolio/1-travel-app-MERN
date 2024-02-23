import mongoose from "mongoose";
import validator from "validator";

interface agencyType extends Document {
  name: string;
  email: string;
  password: string;
  companyLogo: string | null;
  phoneNumber: number;
  address: string;
  city: string;
  country: string;
  websiteUrl: string | null;
  facebookProfile: string | null;
  isApproved: boolean;
  resetPasswordToken: string;
  resetPasswordExpire: string;
  createdAt: Date;
  updatedAt: Date;
}

const agencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },

    email: {
      type: String,
      unique: [true, "Email already Exist"],
      required: [true, "Please enter Email"],
      validate: validator.default.isEmail,
    },

    password: {
      type: String,
      required: [true, "Please enter Email"],
      minLength: [6, "Password should be greater than 6 characters"],
      select: false,
    },

    companyLogo: {
      type: String,
      default: null,
    },

    phoneNumber: {
      type: Number,
      required: [true, "Please enter Phone Number"],
    },

    address: {
      type: String,
      required: [true, "Please enter Company Address"],
    },

    city: {
      type: String,
      required: [true, "Please enter City"],
    },

    country: {
      type: String,
      required: [true, "Please enter Country"],
    },

    websiteUrl: {
      type: String,
      default: null,
    },

    facebookProfile: {
      type: String,
      default: null,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

export const Agency = mongoose.model<agencyType>("Agency", agencySchema);
