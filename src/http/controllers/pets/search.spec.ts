import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { app } from "src/app";
import { prisma } from "src/lib/prisma";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe.only("Search pets - E2E", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should be able to search pets", async () => {
		const organization = await prisma.organization.create({
			data: {
				name: "Lar animal",
				email: "laranimal@gmail.com",
				password_hash: await hash("laranimal", 6),
				telephone: "21988778877",
				street: "Rua A",
				neighborhood: "Melão",
				city: "Cidadela",
				zip_code: "21232222",
			},
		});

		await prisma.pet.create({
			data: {
				id: randomUUID(),
				name: "Cid",
				description: "Doa-se um amigãozão dócil",
				age: "puppy",
				energy: "5",
				independency: "high",
				size: "small",
				images: [],
				requirements: ["Quanto está frio ele fica com a imunidade baixa"],
				isAvailable: true,
				orgId: organization.id,
			},
		});
		await prisma.pet.create({
			data: {
				id: randomUUID(),
				name: "Cid",
				description: "Doa-se um amigãozão dócil",
				age: "puppy",
				energy: "5",
				independency: "high",
				size: "small",
				images: [],
				requirements: ["Quanto está frio ele fica com a imunidade baixa"],
				isAvailable: true,
				orgId: organization.id,
			},
		});

		const response = await request(app.server)
			.get("/pets")
			.query({
				city: "Cidadela",
			})
			.send();

		expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(2)
	});
});
