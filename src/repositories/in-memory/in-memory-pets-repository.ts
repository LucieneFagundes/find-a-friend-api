import { Organization, Pet } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
export class InMemoryPetsRepository implements PetsRepository {
	public items: Pet[] = [];

	async searchMany(
		orgs: Organization[],
		page: number,
		age?: string,
		energy?: string,
		independency?: string,
		size?: string
	) {
		const pets: Pet[] = [];

		for (let org of orgs) {
			const orgPets = this.items
				.filter((item) => {
					return (
						item.orgId === org.id &&
						(age === undefined || item.age === age) &&
						(energy === undefined || item.energy === energy) &&
						(independency === undefined ||
							item.independency === independency) &&
						(size === undefined || item.size === size)
					);
				})
				.slice((page - 1) * 10, page * 10);

			pets.push(...orgPets);
		}

		return pets;
	}

	async findOne(id: string) {
		const pet = this.items.find((item) => item.id === id);
		if (!pet) return null;
		return pet;
	}

	async save(data: Pet): Promise<Pet> {
		const pet = {
			id: data.id,
			isAvailable: data.isAvailable,
			name: data.name,
			description: data.description,
			age: data.age,
			size: data.size,
			energy: data.energy,
			independency: data.independency,
			images: data.images,
			requirements: data.requirements,
			orgId: data.orgId,
		};

		this.items.push(pet);

		return this.items[0];
	}
}
