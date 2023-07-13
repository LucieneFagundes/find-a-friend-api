import { FastifyInstance } from "fastify";
import { create } from "./create";
import { authenticate } from "./authenticate";
import { registerPet } from "./register";
import { verifyJwt } from "src/http/middlewares/verify-jwt";

export async function organizationsRoutes(app: FastifyInstance) {
	app.post("/organizations", create);
	app.post("/sessions", authenticate);

	app.post("/organizations/register", { onRequest: [verifyJwt] }, registerPet);
}
