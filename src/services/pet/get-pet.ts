import { Pet } from "@prisma/client";
import { PetsRepository } from "src/repositories/pets-repository";

interface IGetPetRequest {
	id: string;
}

interface IGetPetResponse {
	pet: Pet;
}

export class GetPetService {
	constructor(private petsRepository: PetsRepository) {}

	async execute({ id }: IGetPetRequest): Promise<IGetPetResponse> {
		const pet = await this.petsRepository.findOne(id);

		if (!pet) {
			throw new Error("Sorry, pet not found!");
		}

		return { pet };
	}
}
