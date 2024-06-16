import {Context, Hono} from 'hono'
import {cors} from "hono/cors";
import connectDB from "./config/db";
import Brand from "./models/brands";
import cars from "./routes/cars";

const app = new Hono()

connectDB()

app.use("*", cors({
    origin: process.env.FRONTEND_URL as string,
}))

app.route("/cars", cars)

app.get("/brands", async (c:Context) => {
    const brands = await Brand.find()
    return c.json(brands)
})

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch
}
