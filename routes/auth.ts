import {Context} from "hono";
import {login, refreshTokens, registerUser} from "../controllers/auth/authControllers";
import {createRoute, OpenAPIHono} from "@hono/zod-openapi";
import {loginDoc, registerDoc} from "../documentation/authDocumentation";

const auth = new OpenAPIHono()

//TODO: rewrite refresh and add to swagger
auth.get("/refresh", async (c: Context) => refreshTokens(c))

auth.openapi(
    createRoute(loginDoc),
    (c: Context) => login(c)
)

auth.openapi(
    createRoute(registerDoc),
    (c: Context) => registerUser(c)
)

export default auth