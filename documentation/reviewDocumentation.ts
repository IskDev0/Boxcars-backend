import {reviewSchema} from "../schemas/reviewSchemas";
import {z} from "@hono/zod-openapi";

const getReviewsDoc = {
    method: "get",
    path: "/:car_id",
    summary: "Get reviews",
    tags: ["Review"],
    description: "Get reviews by car id",
    parameters: [
        {
            schema: {
                type: "string"
            },
            name: "car_id",
            in: "query",
            required: true,
            description: "Car id",
        }
    ],
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: reviewSchema.array()
                }
            }
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Car id is not provided")
                    })
                }
            }
        },
        404: {
            description: "Not found",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("No reviews found")
                    })
                }
            }
        }
    }
}

const postReviewDoc = {
    method: "post",
    path: "/",
    summary: "Post review",
    tags: ["Review"],
    description: "Post review",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: reviewSchema
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
                        message: z.string().default("Review created successfully")
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

const deleteReviewDoc = {
    method: "delete",
    path: "/:id",
    summary: "Delete review",
    tags: ["Review"],
    description: "Delete review by id",
    parameters: [
        {
            schema: {
                type: "string"
            },
            name: "id",
            in: "path",
            required: true,
            description: "Review id",
        }
    ],
    responses: {
        200: {
            description: "Success",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Review deleted successfully")
                    })
                }
            }
        },
        400: {
            description: "Bad request",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Id is not provided")
                    })
                }
            }
        },
        404: {
            description: "Not found",
            content: {
                "application/json": {
                    schema: z.object({
                        message: z.string().default("Review not found")
                    })
                }
            }
        }
    }
}

//TODO: add delete all reviews doc and rewrite controller

export {
    getReviewsDoc,
    postReviewDoc,
    deleteReviewDoc
}