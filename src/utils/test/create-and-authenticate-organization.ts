import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
	await request(app.server).post("/organizations").send({
		name: "Lar animal",
		email: "laranimal@gmail.com",
		password: "laranimal",
		telephone: "21988778877",
		street: "Rua A",
		neighborhood: "Melão",
		city: "Cidadela",
		zip_code: "21232222",
	});

	const authResponse = await request(app.server)
		.post("/sessions")
		.send({ email: "laranimal@gmail.com", password: "laranimal" });

	const { token } = authResponse.body;

	return { token };
}
