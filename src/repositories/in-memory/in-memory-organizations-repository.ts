import { Organization, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { OrganizationsRepository } from "../organizations-repository";

export class InMemoryOrganizationsRepository
	implements OrganizationsRepository
{
	public items: Organization[] = [];

	async findByCity(city: string) {
		return this.items.filter((item) => item.city === city);
	}

	async findByEmail(email: string) {
		const organization = this.items.find((org) => org.email === email);

		if (!organization) return null;

		return organization;
	}

	async findByTelephone(telephone: string) {
		const organization = this.items.find((org) => org.telephone === telephone);

		if (!organization) return null;

		return organization;
	}

	async create(data: Prisma.OrganizationCreateInput) {
		const organization = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			telephone: data.telephone,
			street: data.street,
			neighborhood: data.neighborhood,
			city: data.city,
			zip_code: data.zip_code,
		};

		this.items.push(organization);

		return organization;
	}
}
