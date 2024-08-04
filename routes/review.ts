import {Context} from "hono";
import {deleteReview, getReviews, postReview} from "../controllers/reviews/reviewsController";
import {createRoute, OpenAPIHono} from "@hono/zod-openapi";
import {deleteReviewDoc, getReviewsDoc, postReviewDoc} from "../documentation/reviewDocumentation";

const review = new OpenAPIHono()

review.openapi(
    createRoute(getReviewsDoc),
    (c: Context) => getReviews(c)
)

review.openapi(
    createRoute(postReviewDoc),
    (c: Context) => postReview(c)
)

review.openapi(
    createRoute(deleteReviewDoc),
    (c: Context) => deleteReview(c)
)

export default review