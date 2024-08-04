import {blogSchema} from "../schemas/blogSchemas";
import {z} from "@hono/zod-openapi";

const getBlogsDoc = {
    method: "get",
    path: "/",
    summary: "Get blogs",
    tags: ["Blog"],
    description: "Get all blogs",
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: blogSchema.array()
                }
            }
        },
        404: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("No blogs found")
                    })
                }
            }
        }
    }
}

const getBlogDoc = {
    method: "get",
    path: "/:id",
    summary: "Get blog",
    tags: ["Blog"],
    description: "Get blog by id",
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: blogSchema
                }
            }
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Blog id is not provided")
                    })
                }
            }
        },
        404: {
            description: "Not found",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Blog not found")
                    })
                }
            }
        }
    }
}

const postBlogDoc = {
    method: "post",
    path: "/",
    summary: "Create blog",
    tags: ["Blog"],
    description: "Create blog",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: blogSchema
                }
            }
        }
    },
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Blog created successfully")
                    })
                }
            }
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Body is not provided")
                    })
                }
            }
        }
    }
}

const putBlogDoc = {
    method: "put",
    path: "/:id",
    summary: "Update blog",
    tags: ["Blog"],
    description: "Update blog",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: blogSchema
                }
            }
        }
    },
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Blog updated successfully")
                    })
                }
            }
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Body is not provided")
                    })
                }
            }
        }
    }
}

const deleteBlogDoc = {
    method: "delete",
    path: "/:id",
    summary: "Delete blog",
    tags: ["Blog"],
    description: "Delete blog",
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Blog deleted successfully")
                    })
                }
            }
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Blog id is not provided")
                    })
                }
            }
        }
    }
}

export {
    getBlogsDoc,
    getBlogDoc,
    postBlogDoc,
    putBlogDoc,
    deleteBlogDoc
}