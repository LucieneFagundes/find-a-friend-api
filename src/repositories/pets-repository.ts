import { Organization, Pet } from "@prisma/client";

export interface PetsRepository {
	searchMany(
		orgs: Organization[],
		page: number,
		age?: string,
		energy?: string,
		independency?: string,
		size?: string
	): Promise<Pet[]>;
	findOne(id: string): Promise<Pet | null>;
	save(data: Pet): Promise<Pet>;
}
