import {Context} from "hono";
import User from "../../models/user";
import {sign, verify} from 'hono/jwt'

async function registerUser(c: Context) {
    const userBody = await c.req.json()

    if (!userBody) {
        return c.json({message: "Username or password not provided"}, 400)
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
}

async function login(c: Context) {
    const userBody = await c.req.json()

    if (!userBody.username || !userBody.password) {
        return c.json({message: "Username or password not provided"}, 400)
    }

    try {
        const user = await User.findOne({username: userBody.username})
        if (!user) {
            return c.json({message: "User not found"}, 404)
        }

        const isValidPassword: boolean = await Bun.password.verify(userBody.password, user.password as string)
        if (!isValidPassword) {
            return c.json({message: "Invalid password"}, 401)
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
        return c.json({message: (error as Error).message})
    }
}

//TODO: rewrite token refreshing
async function refreshTokens(c: Context) {
    const refresh = c.req.query("refreshToken")
    if (!refresh) {
        return c.json({message: "Refresh token not found"}, 400)
    }
    try {
        const payload = await verify(refresh, process.env.REFRESH_SECRET as string)
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
        return c.json({message: (error as Error).message})
    }
}

export {
    registerUser,
    login,
    refreshTokens
}