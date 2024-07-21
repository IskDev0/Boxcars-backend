import {Context, Hono} from "hono";
import {calculateLoan, deleteCar, getCar, getCars, postCar, updateCar} from "../controllers/cars/carsContollers";

const cars = new Hono()

cars.get("/:id", async (c: Context) => getCar(c));

cars.get("/", async (c: Context) => getCars(c));

cars.post("/", async (c: Context) => postCar(c))

cars.delete("/:id", async (c: Context) => deleteCar(c))

cars.put("/:id", async (c: Context) => updateCar(c))

cars.post("/calculator", async (c: Context) => calculateLoan(c))

export default cars