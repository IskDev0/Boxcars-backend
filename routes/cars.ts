import {Context, Hono} from "hono";
import Car from "../models/car";

const cars = new Hono()

cars.get("/", async (c: Context) => {
    try {
        const type: string | undefined = c.req.query("type");

        const cars = await Car.find();

        if (!cars) {
            return c.json({ error: "No cars found" });
        }

        if (type === "short") {
            const carsList = cars.map(car => ({
                ...car.short_data,
                _id: car.id
            }));
            return c.json(carsList);
        } else if (type) {
            return c.json({ error: "Bad request" });
        }

        return c.json(cars);

    } catch (error: unknown) {
        console.error(error);
        return c.json({ error: (error as Error).message });
    }
});


cars.post("/", async (c: Context) => {
    const body = await c.req.json()

    const car = new Car(body)
    const createdCar = await car.save()
    return c.json(createdCar.short_data)
})

export default cars