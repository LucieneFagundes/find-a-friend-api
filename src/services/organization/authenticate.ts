import { Organization } from "@prisma/client";
import { compare } from "bcryptjs";
import { OrganizationsRepository } from "src/repositories/organizations-repository";

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
			throw new Error(`Email or password incorrect`);
		}

		const doesPasswordMatches = await compare(password, org.password_hash);

		if (!doesPasswordMatches) {
			throw new Error(`Email or password incorrect`);
		}

		return { org };
	}
}
