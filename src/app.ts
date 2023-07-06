import fastify from "fastify";
import { organizationsRoutes } from "./http/controllers/organizarion/router";

export const app = fastify()

app.register(organizationsRoutes)