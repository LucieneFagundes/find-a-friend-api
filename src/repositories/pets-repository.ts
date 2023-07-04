import { Organization, Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
	findAll(orgs: Organization[]): Promise<Pet[]>;
	findOne(id: string): Promise<Pet | null>;
	save(data: Pet): Promise<Pet>;
}
