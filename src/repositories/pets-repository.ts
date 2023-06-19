import { Pet } from "src/DTOs/pet-dto";

export interface PetsRepository {
	findAll(): Promise<Pet[]>;
	findOne(id: string): Promise<Pet | null>;
	save(data: Pet): Promise<Pet>;
}
