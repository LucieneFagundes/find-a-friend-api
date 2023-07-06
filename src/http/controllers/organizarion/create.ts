import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaOrganizarionsRepository } from "src/repositories/prisma/prisma-organizations-repository";
import { CreateService } from "src/services/organization/create";
import { z } from "zod";

export async function create(request: FastifyRequest, response: FastifyReply) {
	const createOrganizationBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string(),
		telephone: z.string(),
		street: z.string(),
		neighborhood: z.string(),
		city: z.string(),
		zip_code: z.string(),
	});

	const organization = createOrganizationBodySchema.parse(request.body);

	const organizationsRepository = new PrismaOrganizarionsRepository();
	const createOrganizations = new CreateService(organizationsRepository);

	await createOrganizations.execute(organization);

	return response.status(201).send();
}
