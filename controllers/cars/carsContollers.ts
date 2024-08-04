import {Context} from "hono";
import Car from "../../models/car";
import {isValidObjectId} from "mongoose";
import calculateLoanPayment from "../../utils/car/calculateLoanPayment";

async function getCars(c: Context) {

    const page: string | undefined = c.req.query("page") as string
    const limit: string | undefined = c.req.query("limit") as string
    const type: string | undefined = c.req.query("type") as string
    const offset: number = (parseInt(page) - 1) * parseInt(limit);

    try {
        const carsList = await Car.find().skip(offset).limit(parseInt(limit));
        const carsCount: number = await Car.countDocuments();

        if (!carsList) {
            return c.json({message: "No cars found"}, 404);
        }

        if (type === "short") {
            const cars = carsList.map(car => ({
                ...car.short_data,
                _id: car.id
            }));
            return c.json({count: carsCount, cars: cars});
        } else if (type) {
            return c.json({message: "Bad request"}, 400);
        }

        return c.json({count: carsCount, cars: carsList});

    } catch (error: unknown) {
        console.error(error);
        return c.json({message: (error as Error).message});
    }
}

async function getCar(c: Context) {
    try {
        const id: string = c.req.param("id");

        if (!isValidObjectId(id)) {
            return c.json({message: "Car not found. Invalid id"}, 400);
        }

        const car = await Car.findById(id);

        if (!car) {
            return c.json({message: "Car not found"}, 404);
        }

        return c.json(car);

    } catch (error: unknown) {
        return c.json({message: (error as Error).message});
    }
}

async function postCar(c: Context) {
    const body = await c.req.json()

    if (!body) {
        return c.json({error: "Bad request"}, 400);
    }

    try {
        const car = new Car(body);
        await car.save();
        return c.json({message: "Car created successfully"});
    } catch (error: unknown) {
        return c.json({message: (error as Error).message});
    }
}

async function deleteCar(c: Context) {
    const id: string = c.req.param("id");

    if (!isValidObjectId(id)) {
        return c.json({message: "Car not found. Invalid id"}, 400);
    }

    try {
        const car = await Car.findByIdAndDelete(id);
        if (!car) {
            return c.json({message: "Car not found"}, 404);
        }

        return c.json({message: "Car deleted successfully"});

    } catch (error: unknown) {
        return c.json({message: (error as Error).message});
    }
}

async function updateCar(c: Context) {
    const body = await c.req.json()

    if (!body) {
        return c.json({message: "Bad request"}, 400);
    }

    const id: string = c.req.param("id");

    if (!isValidObjectId(id)) {
        return c.json({message: "Car not found. Invalid id"}, 400);
    }

    try {
        const car = await Car.findByIdAndUpdate(id, body, {new: true});
        if (!car) {
            return c.json({message: "Car not found"}, 404);
        }

        return c.json({message: "Car updated successfully"});

    } catch (error: unknown) {
        return c.json({message: (error as Error).message});
    }

}

async function calculateLoan(c: Context) {
    let {price, interestRate, term, initialPayment} = await c.req.json()

    let missingFields: string[] = []

    if (!price) {
        missingFields.push("Price")
    }

    if (!interestRate) {
        missingFields.push("Interest rate")
    }

    if (!term) {
        missingFields.push("Term")
    }

    if (missingFields.length > 0) {
        return c.json({message: `${missingFields.join(", ")} is missing`}, 400)
    }

    return c.json(calculateLoanPayment(price, interestRate, term, initialPayment))
}

export {
    getCars,
    getCar,
    postCar,
    deleteCar,
    updateCar,
    calculateLoan
}
