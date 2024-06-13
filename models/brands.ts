import {model, Schema} from "mongoose";

const brandSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const Brand = model("Brand", brandSchema);

export default Brand