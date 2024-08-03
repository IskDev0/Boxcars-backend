import {Context, Hono} from "hono";
import {login, refreshTokens, registerUser} from "../controllers/auth/authControllers";

const auth = new Hono()

auth.post("/register", async (c: Context) => registerUser(c))

auth.post("/login", async (c: Context) => login(c))

auth.get("/refresh", async (c: Context) => refreshTokens(c))

export default auth