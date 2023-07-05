import { randomUUID } from "node:crypto";
import { InMemoryOrganizationsRepository } from "src/repositories/in-memory/in-memory-organizations-repository";
import { InMemoryPetsRepository } from "src/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetsService } from "./search-pets";

let petsRepository: InMemoryPetsRepository;
let organizationsRepository: InMemoryOrganizationsRepository;
let sut: SearchPetsService;

describe("Search by City", () => {
	beforeEach(async () => {
		petsRepository = new InMemoryPetsRepository();
		organizationsRepository = new InMemoryOrganizationsRepository();
		sut = new SearchPetsService(organizationsRepository, petsRepository);

		const organizationTest = await organizationsRepository.create({
			name: "example organization",
			email: "example@example.com",
			password_hash: "123456",
			telephone: "21-9-8877-8878",
			street: "Rua A, 455",
			zip_code: "23030-380",
			neighborhood: "Jardim",
			city: "Queimados",
		});

		await petsRepository.save({
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
			orgId: organizationTest.id,
		});

		await petsRepository.save({
			id: randomUUID(),
			name: "Pitchuca",
			description: "Doa-se um amigãozão dócil",
			age: "puppy",
			energy: "3",
			independency: "medium",
			size: "big",
			requirements: ["Quanto está frio ele fica com a imunidade baixa"],
			orgId: organizationTest.id,
			isAvailable: true,
			images: [],
		});
	});

	it("should be able to search pets by city", async () => {
		const search = await sut.execute("Queimados", {});

		expect(search).toHaveLength(2);
		expect(search).toEqual([
			expect.objectContaining({ name: "Cid" }),
			expect.objectContaining({ name: "Pitchuca" }),
		]);
	});

	it("should not be able to search for a pet in the chosen city ", async () => {
		await expect(() => sut.execute("Nova Iguaçu", {})).rejects.toThrowError(
			"No pets found in this city"
		);
	});

	it("should be able to filter the search by pet characteristics", async () => {
		const result = await sut.execute("Queimados", { age: "puppy" });

		expect(result).toHaveLength(2);
	});
});
