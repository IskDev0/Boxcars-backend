import {Context, Hono} from "hono";
import {sign, verify} from 'hono/jwt'
import User from "../models/user";
import {jwtMiddleware} from "../middleware/auth";
import {JWTPayload} from "hono/dist/types/utils/jwt/types";

const auth = new Hono()

auth.post("/register", async (c: Context) => {

    const userBody = await c.req.json()

    if (!userBody) {
        return c.json({error: "Username or password not found"})
    }

    const hashedPassword: string = await Bun.password.hash(userBody.password)
    const user = new User({
        username: userBody.username,
        password: hashedPassword,
        email: userBody.email,
        first_name: userBody.first_name,
        last_name: userBody.last_name,
        phone: userBody.phone,
        profile_image: null,
        role: "user",
        address: null
    })
    await user.save()
    return c.json({message: "User created successfully"})
})


auth.post("/login", async (c: Context) => {
    const userBody = await c.req.json()

    if (!userBody.username || !userBody.password) {
        return c.json({error: "Username or password not found"})
    }

    try {
        const user = await User.findOne({username: userBody.username})
        if (!user) {
            return c.json({error: "User not found"})
        }

        const isValidPassword: boolean = await Bun.password.verify(userBody.password, user.password as string)
        if (!isValidPassword) {
            return c.json({error: "Invalid password"})
        }


        const payload = {
            id: user._id,
            exp: Math.floor(Date.now() / 1000) + 60
        }
        const accessToken: string = await sign(payload, process.env.ACCESS_SECRET as string)
        const refreshToken: string = await sign({
            id: user._id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
        }, process.env.REFRESH_SECRET as string)
        return c.json({accessToken: accessToken, refreshToken: refreshToken})
    } catch (error) {
        return c.json({error: (error as Error).message})
    }
})

auth.get("/refresh", async (c: Context) => {
    const refresh = c.req.query("refreshToken")
    if (!refresh) {
        return c.json({error: "Refresh token not found"})
    }
    try {
        const payload: JWTPayload = await verify(refresh, process.env.REFRESH_SECRET as string)
        const accessToken: string = await sign({
            id: payload.id,
            exp: Math.floor(Date.now() / 1000) + 60
        }, process.env.ACCESS_SECRET as string)
        const refreshToken: string = await sign({
            id: payload.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
        }, process.env.REFRESH_SECRET as string)
        return c.json({accessToken: accessToken, refreshToken: refreshToken})
    } catch (error) {
        return c.json({error: (error as Error).message})
    }
})

auth.get("/protected", jwtMiddleware, async (c: Context) => {
    return c.json({message: "Protected route"})
})


export default auth