import {Context, Hono} from "hono";
import {deleteReview, getReviews, postReview} from "../controllers/reviews/reviewsController";

const review = new Hono()

review.get("/", async (c: Context) => getReviews(c))

review.post("/", async (c: Context) => postReview(c))

review.delete("/:id", async (c: Context) => deleteReview(c))

export default review