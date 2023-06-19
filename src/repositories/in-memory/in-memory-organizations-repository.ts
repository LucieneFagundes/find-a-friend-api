import { Organization } from "src/DTOs/organization-dto";
import { OrganizationsRepository } from "../organizations-repository";
import { randomUUID } from "crypto";

export class InMemoryOrganizationsRepository
	implements OrganizationsRepository
{
	public items: Organization[] = [];

	async findByEmail(email: string) {
		const organization = this.items.find((org) => org.email === email);

		if (!organization) return null;

		return organization;
	}

	async findByTelephone(telephone: string) {
		const organization = this.items.find((org) => org.telephone === telephone);

		if (!organization) return null;

		return organization
	}

	async save(data: Organization) {
		const organization = {
			id: randomUUID(),
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
		};

		this.items.push(organization);

		return organization;
	}
}
