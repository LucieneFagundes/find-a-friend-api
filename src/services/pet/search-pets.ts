import { OrganizationsRepository } from "src/repositories/organizations-repository";
import { PetsRepository } from "src/repositories/pets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

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
			throw new InvalidCredentialsError(
				"Please enter a city name to search for pets"
			);
		}

		const orgByCities = await this.organizationsRepository.findByCity(city);

		if (orgByCities.length <= 0) {
			throw new ResourceNotFoundError();
		}

		const pets = await this.petsRepository.searchMany(
			orgByCities,
			page,
			age,
			energy,
			independency,
			size
		);

		return { pets };
	}
}
