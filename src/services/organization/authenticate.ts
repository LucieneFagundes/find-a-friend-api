import { Organization } from "@prisma/client";
import { compare } from "bcryptjs";
import { OrganizationsRepository } from "src/repositories/organizations-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

interface IAuthenticateRequest {
	email: string;
	password: string;
}

interface IAuthenticateResponse {
	org: Organization;
}

export class AuthenticateService {
	constructor(private organizationRepository: OrganizationsRepository) {}

	async execute({
		email,
		password,
	}: IAuthenticateRequest): Promise<IAuthenticateResponse> {
		const org = await this.organizationRepository.findByEmail(email);

		if (!org) {
			throw new InvalidCredentialsError();
		}

		const doesPasswordMatches = await compare(password, org.password_hash);

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError();
		}

		return { org };
	}
}
