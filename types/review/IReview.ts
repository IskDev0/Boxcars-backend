export interface IReview {
    car_id: string;
    user: {
        id: string;
        username: string;
        avatar: string
    };
    rating: number;
    comment: string;
    created_at: Date;
    details: Details
}

export interface Details {
    comfort: number;
    interior: number;
    exterior: number;
    value_for_money: number;
    performance: number;
    reliability: number;
    overall: number
}