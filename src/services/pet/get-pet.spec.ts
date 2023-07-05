import { InMemoryPetsRepository } from "src/repositories/in-memory/in-memory-pets-repository";
import { PetsRepository } from "src/repositories/pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetPetService } from "./get-pet";

let petsRepository: PetsRepository;
let sut: GetPetService;

describe("Get Pet Service", () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository();
		sut = new GetPetService(petsRepository);
	});

	it("should be able get a pet", async () => {
		const createdPet = await petsRepository.save({
			id: "pet-01",
			name: "Oreo",
			description: "a black blind cat",
			age: "ADULT",
			energy: "medium",
			independency: "high",
			size: "normal",
			orgId: "org-1",
			isAvailable: true,
			images: [],
			requirements: ["Precisa de atenção com muitos obstáculos, pois é parcialmente cego"],
		});

		const { pet } = await sut.execute({ id: createdPet.id });

		expect(pet.id).toEqual(expect.any(String));
	});
});
