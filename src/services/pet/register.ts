import { Pet } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { OrganizationsRepository } from "src/repositories/organizations-repository";
import { PetsRepository } from "src/repositories/pets-repository";

interface IRegisterRequest {
	name: string;
	description: string;
	age: string;
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
