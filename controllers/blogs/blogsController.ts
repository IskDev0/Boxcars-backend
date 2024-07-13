import {Context} from "hono";
import Blog from "../../models/blogs";
import {isValidObjectId} from "mongoose";


async function getBlogs(c: Context) {
    try {
        const blogs = await Blog.find()

        if (!blogs) {
            return c.json({error: "No blogs found"}, 404)
        }

        return c.json(blogs)
    } catch (error: unknown) {
        return c.json({error: (error as Error).message})
    }
}

async function getBlog(c: Context) {

    const id: string = c.req.param("id")

    if (!id) {
        return c.json({error: "Blog id is not provided"}, 400)
    }

    if (!isValidObjectId(id)) {
        return c.json({error: "Blog not found. Invalid id"}, 400)
    }

    try {
        const blog = await Blog.findById(id)

        if (!blog) {
            return c.json({error: "Blog not found"}, 404)
        }
        return c.json(blog)
    } catch (error: unknown) {
        return c.json({error: (error as Error).message})
    }
}

async function postBlog(c: Context) {

    const body = await c.req.json()

    if (!body) {
        return c.json({error: "Body is not provided"}, 400)
    }

    try {
        const blog = new Blog(body)
        await blog.save()
        return c.json({message: "Blog created successfully"})
    } catch (error: unknown) {
        return c.json({error: (error as Error).message})
    }
}

async function updateBlog(c: Context) {

    const body = await c.req.json()

    if (!body) {
        return c.json({error: "Body is not provided"}, 400)
    }

    const id: string = c.req.param("id")

    if (!isValidObjectId(id)) {
        return c.json({error: "Blog not found. Invalid id"}, 400)
    }

    if (!id) {
        return c.json({error: "Blog id is not provided"}, 400)
    }

    try {
        const blog = await Blog.findByIdAndUpdate(id, body, {new: true})
        if (!blog) {
            return c.json({error: "Blog not found"}, 404)
        }
        return c.json({message: "Blog updated successfully"})
    } catch (error: unknown) {
        return c.json({error: (error as Error).message})
    }
}

async function deleteBlog(c:Context){
    const id: string = c.req.param("id")

    if (!id) {
        return c.json({error: "Blog id is not provided"}, 400)
    }

    if (!isValidObjectId(id)) {
        return c.json({error: "Blog not found. Invalid id"}, 400)
    }

    try {
        const blog = await Blog.findByIdAndDelete(id)
        if (!blog) {
            return c.json({error: "Blog not found"}, 404)
        }
        return c.json({message: "Blog deleted successfully"})
    } catch (error: unknown) {
        return c.json({error: (error as Error).message})
    }
}

export {
    getBlog,
    getBlogs,
    postBlog,
    updateBlog,
    deleteBlog
}