import {Context, Hono} from 'hono'
import {cors} from "hono/cors";
import connectDB from "./config/db";
import Brand from "./models/brands";
import cars from "./routes/cars";
import auth from "./routes/auth";
import review from "./routes/review";
import blog from "./routes/blog";

const app = new Hono()

connectDB().then(r => console.log("MongoDB connected"))

app.use("*", cors({
    origin: process.env.FRONTEND_URL as string,
}))

app.get("/brands", async (c: Context) => {
    const brands = await Brand.find()
    return c.json(brands)
})

app.route("/cars", cars)
app.route("/auth", auth)
app.route("/review", review)
app.route("/blog", blog)


export default {
    port: process.env.PORT || 3000,
    fetch: app.fetch
}
