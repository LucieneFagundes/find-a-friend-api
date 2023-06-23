import { Organization } from "src/DTOs/organization-dto";

export interface OrganizationsRepository {
	findByCity(city: string): Promise<Organization[]>;
	findByEmail(email: string): Promise<Organization | null>;
	findByTelephone(telephone: string): Promise<Organization | null>;
	save(data: Organization): Promise<Organization>;
}
