import {model, Schema} from "mongoose";

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    first_name: String,
    last_name: String,
    phone: String,
    profile_image: String,
    role: String,
    address: String
});

const User = model("User", UserSchema);

export default User