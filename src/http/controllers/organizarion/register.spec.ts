import { app } from "src/app";
import { createAndAuthenticateOrganization } from "src/utils/test/create-and-authenticate-organization";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Register pet - E2E", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to register a pet", async () => {
		const { token } = await createAndAuthenticateOrganization(app);

		const response = await request(app.server)
			.post("/organizations/register")
			.set("Authorization", `Bearer ${token}`)
			.send({
				name: "Oreo",
				description: "Blind cat",
				age: "adult",
				energy: "1",
				independency: "low",
				size: "medium",
			});

		expect(response.statusCode).toEqual(201);
		
	});
});
