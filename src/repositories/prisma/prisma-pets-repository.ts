import { Organization, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { prisma } from "src/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
	async searchMany(
		orgs: Organization[],
		page: number,
		age?: string | undefined,
		energy?: string | undefined,
		independency?: string | undefined,
		size?: string | undefined
	) {
		const pets: Pet[] = [];

		for (let org of orgs) {
			const orgPets = await prisma.pet.findMany({
				where: {
					orgId: org.id,
					age: age !== undefined ? age : undefined,
					energy: energy !== undefined ? energy : undefined,
					independency: independency !== undefined ? independency : undefined,
					size: size !== undefined ? size : undefined,
				},
				skip: (page - 1) * 10,
				take: 10,
			});

			pets.push(...orgPets);
		}
		return pets;
	}
  
	async findOne(id: string) {
		const pet = await prisma.pet.findUnique({ where: { id } });

		return pet;
	}
	async save(data: Pet) {
		const pet = await prisma.pet.create({ data });

		return pet;
	}
}
