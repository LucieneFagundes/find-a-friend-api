import { Organization, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { OrganizationsRepository } from "../organizations-repository";

export class InMemoryOrganizationsRepository
	implements OrganizationsRepository
{
	public items: Organization[] = [];

	async findById(id: string): Promise<Organization | null> {
		const org = this.items.find((item) => item.id === id);

		if (!org) {
			return null;
		}

		return org;
	}

	async findByCity(city: string) {
		return this.items.filter(
			(item) => item.city.toLowerCase() === city.toLowerCase()
		);
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
