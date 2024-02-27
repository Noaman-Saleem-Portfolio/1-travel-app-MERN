import mongoose from "mongoose";

const travelPackageSchema = new mongoose.Schema({
    packageName:{
        type:String,
        required:[true,"Please enter Package Name"]
    },
    packageCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    packageImages:{
        type:[String],
        default:null
    },
    duration:{
        type:Number,
        required:[true,"Please enter number of days"]
    },
    departure:{
        type:String,
        required:[true,"Please enter location of departure"]
    },
    destination:{
        type:[String],
        required:[true,"Please enter travel package destination locations"]
    },
    transportation:{
        type:String,
        enum:["Plane","Bus","Car","Train","Boat"]
    },
    hotelDetails:{
        type:[{
            name:{
                type:String,
                required:[true,"Please enter Hotel name"]
            },
            stars:{
                type:Number,
                default:1
            }
        }],
        default:null
    },
    DepartureDate:{
        type:Date,
        required: [true, "Please enter Date of departure"]
    },
    returnDate:{
        type:Date,
        required: [true, "Please enter Date of return"]
    },
    price:{
        type:Number,
        required: [true, "Please enter package price"]
    },
    mealInfo:{
        type:String,
        default:null
    },
    numberOfPeople:{
        type:Number,
        required:[true,"Please provide number of people in holiday package"]
    },
    focalPersons:{
        type:[{
            name:String,
            phoneNumber:String
        }],
        required:[true,"Please provide details of people to whom to contact with"]

    }
})

export const Package = mongoose.model("Package",travelPackageSchema)