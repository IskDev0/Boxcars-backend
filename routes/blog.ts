import {Context, Hono} from "hono";
import {deleteBlog, getBlog, getBlogs, postBlog, updateBlog} from "../controllers/blogs/blogsController";

const blog = new Hono()

blog.get("/", async (c: Context) => getBlogs(c))

blog.get("/:id", async (c: Context) => getBlog(c))

blog.post("/", async (c: Context) => postBlog(c))

blog.put("/:id", async (c: Context) => updateBlog(c))

blog.delete("/:id", async (c: Context) => deleteBlog(c))
export default blog