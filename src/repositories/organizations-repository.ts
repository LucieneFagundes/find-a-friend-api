import { Organization } from "src/DTOs/organization-dto";

export interface OrganizationsRepository {
	findByEmail(email: string): Promise<Organization | null>;
	findByTelephone(telephone: string): Promise<Organization | null>;
	save(data: Organization): Promise<Organization>;
}
