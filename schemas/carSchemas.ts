import {z} from "@hono/zod-openapi";

const dealerContactSchema = z.object({
    address: z.string(),
    name: z.string(),
    phone: z.string(),
    profile_image: z.string()
})

const dimensionsAndCapacitySchema = z.object({
    height: z.number(),
    height_full: z.number(),
    length: z.number(),
    loading_weight: z.number(),
    luggage_capacity: z.number(),
    luggage_capacity_full: z.number(),
    roof_load: z.number(),
    seats: z.number(),
    weight: z.number(),
    wheelbase: z.number(),
    width: z.number(),
    width_full: z.number()
})

const engineAndTransmissionSchema = z.object({
    fuel_capacity: z.number(),
    kerb_weight: z.number(),
    towing_weight_braked: z.number(),
    towing_weight_unbraked: z.number(),
    turning_circle: z.number()
})

const featuresSchema = z.object({
    convenience: z.array(z.string()),
    dimensions_and_capacity: dimensionsAndCapacitySchema,
    engine_and_transmission: engineAndTransmissionSchema,
    exterior: z.array(z.string()),
    interior: z.array(z.string()),
    safety: z.array(z.string())
})

const locationSchema = z.object({
    address: z.string(),
    latitude: z.number(),
    longitude: z.number()
})

const overviewSchema = z.object({
    body: z.string(),
    colors: z.array(z.string()),
    condition: z.string(),
    cylinder: z.number(),
    doors: z.number(),
    drive_type: z.string(),
    engine_size: z.number(),
    fuel_type: z.string(),
    mileage: z.number(),
    price: z.number(),
    transmission: z.string(),
    vin: z.string(),
    year: z.number(),
})

const shortCarSchema = z.object({
    _id: z.string(),
    name: z.string(),
    long_name: z.string(),
    image: z.string(),
    mileage: z.number(),
    fuel_type: z.string(),
    transmission: z.string(),
    price: z.number(),
    price_old: z.number(),
    is_sale: z.boolean(),
})

const carSchema = z.object({
    _id: z.string(),
    brochure_url: z.string(),
    dealer_contact: dealerContactSchema,
    description: z.string(),
    features: featuresSchema,
    images: z.array(z.string()),
    location: locationSchema,
    overview: overviewSchema,
    schedule_url: z.string(),
    short_data: shortCarSchema
})

export {
    dealerContactSchema,
    dimensionsAndCapacitySchema,
    engineAndTransmissionSchema,
    featuresSchema,
    locationSchema,
    overviewSchema,
    shortCarSchema,
    carSchema
}