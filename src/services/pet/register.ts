import { Pet } from "src/DTOs/pet-dto";
import { PetsRepository } from "src/repositories/pets-repository";

interface IRegisterRequest {
	name: string;
	description: string;
	age: "puppy" | "adult" | "elderly";
	size: string;
	energy: string;
	independency: string;
	images?: string[];
	requirements?: string[];
	orgId: string;
}

interface IRegisterResponse {
	pet: Pet;
}

export class RegisterService {
	constructor(private petsRepository: PetsRepository) {}

	async execute(data: IRegisterRequest): Promise<IRegisterResponse> {
		const pet = await this.petsRepository.save({
			name: data.name,
			description: data.description,
			age: data.age,
			size: data.size,
			energy: data.energy,
			independency: data.independency,
			images: data.images,
			requirements: data.requirements,
			orgId: data.orgId,
		});

		return { pet };
	}
}
