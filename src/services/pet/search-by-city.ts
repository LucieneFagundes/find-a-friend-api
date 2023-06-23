import { OrganizationsRepository } from "src/repositories/organizations-repository";
import { PetsRepository } from "src/repositories/pets-repository";

export class SearchByCityService {
	constructor(
		private organizationsRepository: OrganizationsRepository,
		private petsRepository: PetsRepository
	) {}

	async execute(city: string) {
		const orgByCities = this.organizationsRepository.findByCity(city);

		if ((await orgByCities).length <=0) {
			throw new Error(`No pets found in this city`);
		}

		const pets = await this.petsRepository.findAll(await orgByCities);


		return pets;
	}
}
