import { hash } from "bcryptjs";
import { app } from "src/app";
import { prisma } from "src/lib/prisma";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

describe("Pet Detail - E2E", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to request a pet by id", async () => {
		const createdOrg = await prisma.organization.create({
			data: {
				name: "Cat Home",
				email: "cat@example.com",
				password_hash: await hash("cathome", 6),
				telephone: "21988778877",
				street: "4-2",
				neighborhood: "Purley",
				city: "London",
				zip_code: "00000-000",
			},
		});

		const createdPet = await prisma.pet.create({
			data: {
				name: "Oreo",
				description: "Blind cat",
				age: "adult",
				energy: "1",
				independency: "low",
				size: "medium",
				orgId: createdOrg.id,
			},
		});

		const response = await request(app.server)
			.get(`/pets/${createdPet.id}`)
			.send();

		expect(response.statusCode).toEqual(200);
	});
});
