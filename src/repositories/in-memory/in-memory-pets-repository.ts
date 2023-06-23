import { randomUUID } from "crypto";
import { Organization } from "src/DTOs/organization-dto";
import { Pet } from "src/DTOs/pet-dto";
import { PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
	public items: Pet[] = [];

	async findAll(orgs: Organization[]) {
		const pets: Pet[] = [];
		for (let org of orgs) {
			const orgPets = this.items.filter((item) => item.orgId === org.id);
			pets.push(...orgPets);
		}

		return pets;
	}

	async findOne(id: string) {
		const pet = this.items.find((item) => item.id === id);
		if (!pet) return null;
		return pet;
	}

	async save(data: Pet) {
		const pet = {
			id: randomUUID(),
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

		return pet;
	}
}
