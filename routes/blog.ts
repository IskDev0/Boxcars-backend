import {Context} from "hono";
import {deleteBlog, getBlog, getBlogs, postBlog, updateBlog} from "../controllers/blogs/blogsController";
import {createRoute, OpenAPIHono} from "@hono/zod-openapi";
import {deleteBlogDoc, getBlogDoc, getBlogsDoc, postBlogDoc, putBlogDoc} from "../documentation/blogDocumentation";

const blog = new OpenAPIHono()
blog.openapi(
    createRoute(getBlogsDoc),
    (c: Context) => getBlogs(c)
)

blog.openapi(
    createRoute(postBlogDoc),
    (c: Context) => postBlog(c)
)

blog.openapi(
    createRoute(putBlogDoc),
    (c: Context) => updateBlog(c)
)

blog.openapi(
    createRoute(getBlogDoc),
    (c: Context) => getBlog(c)
)

blog.openapi(
    createRoute(deleteBlogDoc),
    (c: Context) => deleteBlog(c)
)

export default blog