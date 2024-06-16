import {model, Schema} from "mongoose";

const CarSchema = new Schema({
    brochure_url: String,
    dealer_contact: {
        address: String,
        name: String,
        phone: String,
        profile_image: String
    },
    description: String,
    features: {
        convenience: [String],
        dimensions_and_capacity: {
            height: Number,
            height_full: Number,
            length: Number,
            loading_weight: Number,
            luggage_capacity: Number,
            luggage_capacity_full: Number,
            roof_load: Number,
            seats: Number,
            weight: Number,
            wheelbase: Number,
            width: Number,
            width_full: Number
        },
        engine_and_transmission: {
            fuel_capacity: Number,
            kerb_weight: Number,
            towing_weight_braked: Number,
            towing_weight_unbraked: Number,
            turning_circle: Number
        },
        exterior: [String],
        interior: [String],
        safety: [String]
    },
    images: [String],
    location: {
        address: String,
        latitude: Number,
        longitude: Number
    },
    overview: {
        body: String,
        colors: [String],
        condition: String,
        cylinder: Number,
        doors: Number,
        drive_type: String,
        engine_size: Number,
        fuel_type: String,
        mileage: Number,
        price: Number,
        transmission: String,
        vin: String,
        year: Number
    },
    schedule_url: String,
    short_data: {
        name: String,
        long_name: String,
        image: String,
        mileage: Number,
        fuel_type: String,
        transmission: String,
        price: Number,
        price_old: Number,
        is_sale: Boolean,
    }
});

const Car = model("Cars", CarSchema);

export default Car