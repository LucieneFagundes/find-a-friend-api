import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaPetsRepository } from "src/repositories/prisma/prisma-pets-repository";
import { RegisterService } from "src/services/pet/register";
import { z } from "zod";

export async function registerPet(
	request: FastifyRequest,
	response: FastifyReply
) {
	const registerPetBodyRequest = z.object({
		name: z.string(),
		description: z.string(),
		age: z.string(),
		size: z.string(),
		energy: z.string(),
		independency: z.string(),
		images: z.string().array().optional(),
		requirements: z.string().array().optional(),
	});

	const {
		name,
		description,
		age,
		size,
		energy,
		independency,
		images,
		requirements,
	} = registerPetBodyRequest.parse(request.body);

	const petsRepository = new PrismaPetsRepository();
	const registerService = new RegisterService(petsRepository);

	const { pet } = await registerService.execute({
		name,
		description,
		age,
		size,
		energy,
		independency,
		images,
		requirements,
		orgId: request.user.sub,
	});

	return response.status(201).send({ pet });
}
