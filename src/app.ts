import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
import { organizationsRoutes } from "./http/controllers/organizarion/router";

export const app = fastify();

// DEPENDENCIES
app.register(fastifyJwt, {
	secret: env.JWT_SECRET_KEY,
	cookie: {
		cookieName: "refreshToken",
		signed: false,
	},
	sign: {
		expiresIn: "10m",
	},
});
app.register(fastifyCookie);

// ROUTES
app.register(organizationsRoutes);
