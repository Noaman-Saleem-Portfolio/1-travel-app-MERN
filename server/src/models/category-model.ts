import mongoose, { Document } from "mongoose";

// export interface categoryType extends Document {
//     categoryName: string,
//     packages: [string]
// }

const categorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Please enter Category Name"],
    },
    // packages:{
    //     type: [mongoose.Schema.Types.ObjectId],
    //     ref:"Package"
    // }
  },
  {
    timestamps: true,
  }
);

export const Category = mongoose.model("Category", categorySchema);
