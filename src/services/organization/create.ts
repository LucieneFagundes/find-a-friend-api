import { hash } from "bcryptjs";
import { Organization } from "src/DTOs/organization-dto";
import { OrganizationsRepository } from "src/repositories/organizations-repository";

interface ICreateRequest {
	name: string;
	email: string;
	password: string;
	telephone: string;
	address: String;
	neighborhood: String;
	city: String;
	zip_code: String;
}

interface ICreateResponse {
	organization: Organization;
}

export class CreateService {
	constructor(private organizationsRepository: OrganizationsRepository) {}

	async execute(data: ICreateRequest): Promise<ICreateResponse> {
		const emailAlreadyExists = await this.organizationsRepository.findByEmail(
			data.email
		);

		if (emailAlreadyExists) {
			throw new Error("Email already exists");
		}

		const telephoneAlreadyExists =
			await this.organizationsRepository.findByTelephone(data.telephone);
		if (telephoneAlreadyExists) {
			throw new Error("Telephone already exists");
		}

		const password_hash = await hash(data.password, 6);

		const organization = await this.organizationsRepository.save({
			name: data.name,
			email: data.email,
			password: password_hash,
			telephone: data.telephone,
			address: data.address,
			neighborhood: data.neighborhood,
			city: data.city,
			zip_code: data.zip_code,
		});

		return { organization };
	}
}
