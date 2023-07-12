import { app } from "src/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate an Organization - E2E", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to authenticate an organization", async () => {
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

		const response = await request(app.server)
			.post("/sessions")
			.send({
				email: "laranimal@gmail.com",
				password: "laranimal",
			});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			token: expect.any(String),
		});
	});
});
