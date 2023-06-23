import { Organization } from "src/DTOs/organization-dto";
import { Pet } from "src/DTOs/pet-dto";

export interface PetsRepository {
	findAll(orgs: Organization[]): Promise<Pet[]>;
	findOne(id: string): Promise<Pet | null>;
	save(data: Pet): Promise<Pet>;
}
