import {model, Schema} from "mongoose";

const BlogSchema = new Schema({
    title: String,
    content: String,
    image: String,
    author: {
        name: String,
        id: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    category: String,
})

const Blog = model("Blog", BlogSchema);

export default Blog