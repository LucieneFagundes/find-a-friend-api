import { Organization, Prisma } from "@prisma/client";
import { OrganizationsRepository } from "../organizations-repository";
import { prisma } from "src/lib/prisma";

export class PrismaOrganizarionsRepository implements OrganizationsRepository {
	async findById(id: string) {
		const org = await prisma.organization.findUnique({
			where: { id },
		});

		return org;
	}

	async findByCity(city: string) {
		const orgs = await prisma.organization.findMany({
			where: { city },
		});

		return orgs;
	}

	async findByEmail(email: string) {
		const org = await prisma.organization.findUnique({
			where: { email },
		});

		return org;
	}

	async findByTelephone(telephone: string) {
		const org = await prisma.organization.findFirst({ where: { telephone } });

		return org;
	}

	async create(data: Prisma.OrganizationCreateInput) {
		const org = await prisma.organization.create({
			data,
		});

		return org;
	}
}
