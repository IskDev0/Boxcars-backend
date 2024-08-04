import {z} from "@hono/zod-openapi";

const reviewUserSchema = z.object({
    id: z.string(),
    username: z.string(),
    avatar: z.string()
})

const reviewDetailsSchema = z.object({
    comfort: z.number(),
    interior: z.number(),
    exterior: z.number(),
    value_for_money: z.number(),
    performance: z.number(),
    reliability: z.number(),
    overall: z.number()
})

const reviewSchema = z.object({
    car_id: z.string(),
    user: reviewUserSchema,
    rating: z.number(),
    comment: z.string(),
    created_at: z.date(),
    details: reviewDetailsSchema
})

export {
    reviewSchema
}