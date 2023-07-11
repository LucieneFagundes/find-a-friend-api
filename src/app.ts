import fastify from "fastify";
import { organizationsRoutes } from "./http/controllers/organizarion/router";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";

export const app = fastify()

app.register(fastifyJwt)
app.register(fastifyCookie)

app.register(organizationsRoutes)