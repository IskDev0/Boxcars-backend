import {Context} from "hono";
import {calculateLoan, deleteCar, getCar, getCars, postCar, updateCar} from "../controllers/cars/carsContollers";
import {createRoute, OpenAPIHono} from "@hono/zod-openapi";
import {
    calculatorInfo,
    deleteCarInfo,
    getCarInfo,
    getCarsInfo,
    postCarInfo,
    putCarInfo
} from "../documentation/carDocumentation";

const cars = new OpenAPIHono()
cars.openapi(
    createRoute(getCarsInfo),
    (c: Context) => getCars(c)
)

cars.openapi(
    createRoute(getCarInfo),
    (c: Context) => getCar(c)
)

cars.openapi(
    createRoute(postCarInfo),
    (c: Context) => postCar(c)
)

cars.openapi(
    createRoute(putCarInfo),
    (c: Context) => updateCar(c)
)

cars.openapi(
    createRoute(deleteCarInfo),
    (c: Context) => deleteCar(c)
)

cars.openapi(
    createRoute(calculatorInfo),
    (c: Context) => calculateLoan(c)
)

export default cars