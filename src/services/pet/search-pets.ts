import { OrganizationsRepository } from "src/repositories/organizations-repository";
import { PetsRepository } from "src/repositories/pets-repository";

interface PetRequest {
	age?: string;
	energy?: string;
	independency?: string;
	size?: string;
}
export class SearchPetsService {
	constructor(
		private organizationsRepository: OrganizationsRepository,
		private petsRepository: PetsRepository
	) {}

	async execute(city: string, { age, energy, independency, size }: PetRequest) {
		const orgByCities = await this.organizationsRepository.findByCity(city);

		if ((orgByCities).length <= 0) {
			throw new Error(`No pets found in this city`);
		}

		const pets = await this.petsRepository.findAll(
			orgByCities,
			age,
			energy,
			independency,
			size
		);

		return pets;
	}
}
