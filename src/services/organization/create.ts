import { Organization } from "src/DTOs/organization-dto";
import { OrganizationsRepository } from "src/repositories/organizations-repository";

interface ICreateRequest {
	name: string;
	email: string;
	password: string;
	telephone: string;
	address: {
		street: String;
		neighborhood: String;
		city: String;
		zip_code: String;
	};
}

interface ICreateResponse {
	organization: Organization;
}

export class CreateService {
	constructor(private organizationsRepository: OrganizationsRepository) {}

	async execute(data: ICreateRequest): Promise<ICreateResponse> {

		const emailAlreadyExists = await this.organizationsRepository.findByEmail(data.email);

		if(emailAlreadyExists) {
			throw new Error('Email already exists')
		}

		const telephoneAlreadyExists = await this.organizationsRepository.findByTelephone(data.telephone);
		if(telephoneAlreadyExists) {
			throw new Error('Telephone already exists')
		}

		const organization = await this.organizationsRepository.save({
			name: data.name,
			email: data.email,
			password: data.password,
			telephone: data.telephone,
			address: {
				street: data.address.street,
				neighborhood: data.address.neighborhood,
				city: data.address.city,
				zip_code: data.address.zip_code,
			},
		});

		return { organization };
	}
}
