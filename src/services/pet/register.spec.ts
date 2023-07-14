import { InMemoryPetsRepository } from "src/repositories/in-memory/in-memory-pets-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterService } from "./register";

let petsRepository: InMemoryPetsRepository;
let sut: RegisterService;

describe("Register Pet Service", () => {
	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository();
		sut = new RegisterService(petsRepository);
	});

	it("should be able to register a pet", async () => {
		const { pet } = await sut.execute({
			name: "Cid",
			description: "Doa-se um amigãozão dócil",
			age: "adult",
			energy: "3",
			independency: "2",
			size: "big",
			images: ["test-image.png"],
			requirements: ["requirements 1", "requirements 2"],
			orgId: "org-1",
		});

		expect(pet.id).toEqual(expect.any(String));
	});
});
