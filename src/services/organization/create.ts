import { Organization } from "@prisma/client";
import { hash } from "bcryptjs";
import { OrganizationsRepository } from "src/repositories/organizations-repository";
import { CredentialAlreadyExistsError } from "../errors/credential-already-exists.error";

interface ICreateRequest {
	name: string;
	email: string;
	password: string;
	telephone: string;
	street: string;
	neighborhood: string;
	city: string;
	zip_code: string;
}

interface ICreateResponse {
	organization: Organization;
}

export class CreateService {
	constructor(private organizationsRepository: OrganizationsRepository) {}

	async execute({
		name,
		email,
		password,
		telephone,
		street,
		neighborhood,
		city,
		zip_code,
	}: ICreateRequest): Promise<ICreateResponse> {
		const emailAlreadyExists = await this.organizationsRepository.findByEmail(
			email
		);

		if (emailAlreadyExists) {
			throw new CredentialAlreadyExistsError("email");
		}

		const telephoneAlreadyExists =
			await this.organizationsRepository.findByTelephone(telephone);
		if (telephoneAlreadyExists) {
			throw new CredentialAlreadyExistsError("telephone");
		}

		const password_hash = await hash(password, 6);

		const organization = await this.organizationsRepository.create({
			name,
			email,
			password_hash,
			telephone,
			street,
			neighborhood,
			city,
			zip_code,
		});

		return { organization };
	}
}
