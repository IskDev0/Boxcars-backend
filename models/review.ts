import {model, Schema} from "mongoose";

const ReviewSchema = new Schema({
    car_id: String,
    user: {
        id: String,
        username: String,
        avatar: String
    },
    rating: {
        type: Number,
        required: true
    },
    comment: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    details: {
        comfort: Number,
        interior: Number,
        exterior: Number,
        value_for_money: Number,
        performance: Number,
        reliability: Number,
        overall: Number
    }
})

const Review = model("Reviews", ReviewSchema);

export default Review