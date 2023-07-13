import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaOrganizarionsRepository } from "src/repositories/prisma/prisma-organizations-repository";
import { PrismaPetsRepository } from "src/repositories/prisma/prisma-pets-repository";
import { GetPetService } from "src/services/pet/get-pet";
import { z } from "zod";

export async function petDetail(
	request: FastifyRequest,
	response: FastifyReply
) {
	const petDetailParamsSchema = z.object({
		id: z.string().uuid(),
	});

	const { id } = petDetailParamsSchema.parse(request.params);

	const petsRepository = new PrismaPetsRepository();
	const orgsRepository = new PrismaOrganizarionsRepository();
	const getPetService = new GetPetService(petsRepository, orgsRepository);

	const { pet, organization } = await getPetService.execute({ id });

	return response.status(200).send({ pet, organization });
}
