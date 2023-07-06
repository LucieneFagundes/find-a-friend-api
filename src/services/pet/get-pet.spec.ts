import { InMemoryPetsRepository } from "src/repositories/in-memory/in-memory-pets-repository";
import { PetsRepository } from "src/repositories/pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetPetService } from "./get-pet";
import { OrganizationsRepository } from "src/repositories/organizations-repository";
import { InMemoryOrganizationsRepository } from "src/repositories/in-memory/in-memory-organizations-repository";

let petsRepository: PetsRepository;
let organizationsRepository: OrganizationsRepository;
let sut: GetPetService;

describe("Get Pet Service", () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository();
		organizationsRepository = new InMemoryOrganizationsRepository();
		sut = new GetPetService(petsRepository, organizationsRepository);
	});

	it("should be able get a pet", async () => {
		const organization = await organizationsRepository.create({
			name: "Lar Animal",
			email: "lar.animal@gmail.com",
			password_hash: "123456",
			telephone: "21988778877",
			city: "Rio de Janeiro",
			neighborhood: "Campo Grande",
			street: "Avenida Cesário de Melo",
			zip_code: "23330380",
		});

		const createdPet = await petsRepository.save({
			id: "pet-01",
			name: "Oreo",
			description: "a black blind cat",
			age: "ADULT",
			energy: "medium",
			independency: "high",
			size: "normal",
			orgId: organization.id,
			isAvailable: true,
			images: [],
			requirements: [
				"Precisa de atenção com muitos obstáculos, pois é parcialmente cego",
			],
		});

		const { pet } = await sut.execute({ id: createdPet.id });

		expect(pet.id).toEqual(expect.any(String));
	});
});
