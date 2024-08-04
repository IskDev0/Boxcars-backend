import {z} from "@hono/zod-openapi";

const authorSchema = z.object({
    name: z.string(),
    id: z.string()
})

const blogSchema = z.object({
    title: z.string(),
    content: z.string(),
    image: z.string(),
    author: authorSchema,
    created_at: z.date(),
    updated_at: z.date(),
    category: z.string()
})

export {
    blogSchema
}
