import { Organization, Pet } from "@prisma/client";
import { OrganizationsRepository } from "src/repositories/organizations-repository";
import { PetsRepository } from "src/repositories/pets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface IGetPetRequest {
	id: string;
}

interface IGetPetResponse {
	pet: Pet;
	organization: Omit<Organization, "id" | "email" | "password_hash">;
}

export class GetPetService {
	constructor(
		private petsRepository: PetsRepository,
		private organizationsRepository: OrganizationsRepository
	) {}

	async execute({ id }: IGetPetRequest): Promise<IGetPetResponse> {
		const pet = await this.petsRepository.findOne(id);

		if (!pet) {
			throw new ResourceNotFoundError();
		}

		// TODO: Is this really necessary?
		const organization = await this.organizationsRepository.findById(pet.orgId);

		if (!organization) {
			throw new ResourceNotFoundError();
		}

		const { name, telephone, neighborhood, city, street, zip_code } =
			organization;

		return {
			pet,
			organization: {
				name,
				telephone,
				street,
				neighborhood,
				city,
				zip_code,
			},
		};
	}
}
