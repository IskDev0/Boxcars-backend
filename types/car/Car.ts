export interface ShortCar {
    _id: string,
    name: string,
    long_name: string,
    image: string,
    mileage: number,
    fuel_type: string,
    transmission: string,
    price: number,
    price_old: number,
    is_sale: boolean,
}

export interface ICar {
    _id: string
    brochure_url: string
    dealer_contact: DealerContact
    description: string
    features: Features
    images: string[]
    location: Location
    overview: Overview
    schedule_url: string,
    short_data: ShortCar
}

export interface DealerContact {
    address: string
    name: string
    phone: string
    profile_image: string
}

export interface Features {
    convenience: string[]
    dimensions_and_capacity: DimensionsAndCapacity
    engine_and_transmission: EngineAndTransmission
    exterior: string[]
    interior: string[]
    safety: string[]
}

export interface DimensionsAndCapacity {
    height: number
    height_full: number
    length: number
    loading_weight: number
    luggage_capacity: number
    luggage_capacity_full: number
    roof_load: number
    seats: number
    weight: number
    wheelbase: number
    width: number
    width_full: number
}

export interface EngineAndTransmission {
    fuel_capacity: number
    kerb_weight: number
    towing_weight_braked: number
    towing_weight_unbraked: number
    turning_circle: number
}

export interface Location {
    address: string
    latitude: number
    longitude: number
}

export interface Overview {
    body: string
    colors: string[]
    condition: string
    cylinder: number
    doors: number
    drive_type: string
    engine_size: number
    fuel_type: string
    mileage: number
    price: number
    transmission: string
    vin: string
    year: number
}
