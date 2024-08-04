import {z} from "@hono/zod-openapi";
import {registerSchema} from "../schemas/authSchemas";

const loginDoc = {
    method: "post",
    path: "/login",
    tags: ["Auth"],
    summary: "Login",
    description: "Login",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: z.object({
                        username: z.string(),
                        password: z.string()
                    })
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
                        accessToken: z.string(),
                        refreshToken: z.string()
                    })
                }
            }
        },
        400: {
            description: "Bad Request",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Username or password not provided")
                    })
                }
            }
        },
        401: {
            description: "Invalid credentials",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Invalid username or password")
                    })
                }
            }
        },
        404: {
            description: "Not found",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("User not found")
                    })
                }
            }
        }
    }
}

const registerDoc = {
    method: "post",
    path: "/register",
    tags: ["Auth"],
    summary: "Register",
    description: "Register",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: registerSchema
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
                        message: z.string().default("User created successfully")
                    })
                }
            }
        },
        400: {
            description: "Bad Request",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Username or password not provided")
                    })
                }
            }
        }
    }
}

export {
    loginDoc,
    registerDoc
}