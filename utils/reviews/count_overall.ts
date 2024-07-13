import {IReview} from "../../types/review/IReview";

export default function countOverall(reviews: IReview[], option: string): number {
    return reviews.reduce((acc, review) => acc + review.details[option as keyof IReview["details"]], 0) / reviews.length
}