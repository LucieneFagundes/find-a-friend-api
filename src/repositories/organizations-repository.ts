import { Organization, Prisma } from "@prisma/client";

export interface OrganizationsRepository {
	findById(id: string): Promise<Organization | null>;
	findByCity(city: string): Promise<Organization[]>;
	findByEmail(email: string): Promise<Organization | null>;
	findByTelephone(telephone: string): Promise<Organization | null>;
	create(data: Prisma.OrganizationCreateInput): Promise<Organization>;
}
