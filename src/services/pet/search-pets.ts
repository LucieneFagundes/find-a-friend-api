import { OrganizationsRepository } from "src/repositories/organizations-repository";
import { PetsRepository } from "src/repositories/pets-repository";

interface ISearchRequest {
	city: string;
	page: number;
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

	async execute({
		city,
		page,
		age,
		energy,
		independency,
		size,
	}: ISearchRequest) {
		if (!city || city == "") {
			throw new Error("Please enter a city name to search for pets");
		}

		const orgByCities = await this.organizationsRepository.findByCity(city);

		if (orgByCities.length <= 0) {
			throw new Error(`No pets found in this city`);
		}

		const pets = await this.petsRepository.searchMany(
			orgByCities,
			page,
			age,
			energy,
			independency,
			size
		);

		return pets;
	}
}
