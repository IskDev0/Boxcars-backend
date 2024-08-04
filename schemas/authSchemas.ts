import {z} from "@hono/zod-openapi";

const loginSchema = z.object({
    username: z.string(),
    password: z.string()
})

const registerSchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    phone: z.string(),
})

export {
    loginSchema,
    registerSchema
}
