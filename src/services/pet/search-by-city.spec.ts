import { InMemoryOrganizationsRepository } from "src/repositories/in-memory/in-memory-organizations-repository";
import { InMemoryPetsRepository } from "src/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchByCityService } from "./search-by-city";

let petsRepository: InMemoryPetsRepository;
let organizationsRepository: InMemoryOrganizationsRepository;
let sut: SearchByCityService;

describe("Search by City", () => {
	beforeEach(async () => {
		petsRepository = new InMemoryPetsRepository();
		organizationsRepository = new InMemoryOrganizationsRepository();
		sut = new SearchByCityService(organizationsRepository, petsRepository);
	});

	it("should be able to search pets by city", async () => {
		const organization = await organizationsRepository.save({
			name: "example organization",
			email: "example@example.com",
			password: "123456",
			telephone: "21-9-8877-8878",
			address: "Rua A, 455",
			zip_code: "23030-380",
			neighborhood: "Jardim",
			city: "Queimados",
		});

		await petsRepository.save({
			name: "Cid",
			description: "Doa-se um amigãozão dócil",
			age: "adult",
			energy: "3",
			independency: "2",
			size: "big",
			requirements: ["Quanto está frio ele fica com a imunidade baixa"],
			orgId: organization.id,
		});

		await petsRepository.save({
			name: "Pitchuca",
			description: "Doa-se um amigãozão dócil",
			age: "adult",
			energy: "3",
			independency: "2",
			size: "big",
			requirements: ["Quanto está frio ele fica com a imunidade baixa"],
			orgId: organization.id,
		});

		const search = await sut.execute("Queimados");

		expect(search).toHaveLength(2);
		expect(search).toEqual([
			expect.objectContaining({ name: "Cid" }),
			expect.objectContaining({ name: "Pitchuca" }),
		]);
	});

	it("should not be able to search for a pet in the chosen city ", async () => {
		const organization = await organizationsRepository.save({
			name: "example organization",
			email: "example@example.com",
			password: "123456",
			telephone: "21-9-8877-8878",
			address: "Rua A, 455",
			zip_code: "23030-380",
			neighborhood: "Jardim",
			city: "Queimados",
		});

		await petsRepository.save({
			name: "Cid",
			description: "Doa-se um amigãozão dócil",
			age: "adult",
			energy: "3",
			independency: "2",
			size: "big",
			requirements: ["Quanto está frio ele fica com a imunidade baixa"],
			orgId: organization.id,
		});

		await expect(() => sut.execute("Nova Iguaçu")).rejects.toThrowError(
			"No pets found in this city"
		);
	});
});
