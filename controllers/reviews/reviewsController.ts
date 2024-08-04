import Review from "../../models/review";
import {Context} from "hono";
import countOverall from "../../utils/reviews/count_overall";
import {Details, IReview} from "../../types/review/IReview";

async function getReviews(c: Context) {

    const car_id: string = c.req.param("car_id");

    if (!car_id) {
        return c.json({message: "Car ID is not provided"}, 404);
    }

    try {
        const reviews: IReview[] = await Review.find({car_id});

        if (!reviews || reviews.length === 0) {
            return c.json({error: "No reviews found by this car"}, 404);
        }

        let overall_data: Details = {
            comfort: countOverall(reviews, "comfort"),
            interior: countOverall(reviews, "interior"),
            exterior: countOverall(reviews, "exterior"),
            value_for_money: countOverall(reviews, "value_for_money"),
            performance: countOverall(reviews, "performance"),
            reliability: countOverall(reviews, "reliability"),
            overall: countOverall(reviews, "overall")
        }

        return c.json({
            reviews: reviews,
            overall_data,
            count: reviews.length
        });
    } catch (error: unknown) {
        return c.json({message: (error as Error).message});
    }
}

async function postReview(c: Context) {

    const body = await c.req.json();

    if (!body) {
        return c.json({message: "Body is not provided"}, 400);
    }

    try {
        const review = new Review(body);
        await review.save();
        return c.json({message: "Review created successfully"});
    } catch (error: unknown) {
        return c.json({error: (error as Error).message});
    }
}

async function deleteReview(c: Context) {
    const id: string = c.req.param("id");

    if (!id) {
        return c.json({message: "ID is not provided"}, 400);
    }

    try {
        let review: IReview[] = await Review.find({id});

        if (!review) {
            return c.json({message: "Review not found"}, 404);
        }

        return c.json({message: "Review deleted successfully"});
    } catch (error: unknown) {
        return c.json({message: (error as Error).message});
    }
}

async function deleteAllReviews(c: Context) {
    try {
        await Review.deleteMany({});
        return c.json({message: "Reviews deleted successfully"});
    } catch (error: unknown) {
        return c.json({message: (error as Error).message});
    }
}


export {
    getReviews,
    postReview,
    deleteReview,
    deleteAllReviews
}