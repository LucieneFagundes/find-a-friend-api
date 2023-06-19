import { Pet } from "src/DTOs/pet-dto";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "crypto";

export class InMemoryPetsRepository implements PetsRepository {
	public items: Pet[] = [];

	async findAll() {
		return this.items;
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
