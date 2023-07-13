import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaOrganizarionsRepository } from "src/repositories/prisma/prisma-organizations-repository";
import { PrismaPetsRepository } from "src/repositories/prisma/prisma-pets-repository";
import { SearchPetsService } from "src/services/pet/search-pets";
import { z } from "zod";

export async function search(request: FastifyRequest, response: FastifyReply) {
  
	// http://localhost:3000/pets?city=CITY&age=AGE&energy=ENERGY&independency=INDEPENDENCY&size=size&_page=PAGE
	try {
		const searchQuerySchema = z.object({
			city: z.string(),
			age: z.string().optional(),
			energy: z.string().optional(),
			independency: z.string().optional(),
			size: z.string().optional(),
			page: z.coerce.number().min(1).default(1),
		});

		const { city, age, energy, independency, size, page } =
			searchQuerySchema.parse(request.query);

		const orgRepository = new PrismaOrganizarionsRepository();
		const petsRepository = new PrismaPetsRepository();
		const searchPetsService = new SearchPetsService(
			orgRepository,
			petsRepository
		);

		const { pets } = await searchPetsService.execute({
			city,
			age,
			energy,
			independency,
			size,
			page,
		});

		return response.status(200).send({ pets });
	} catch (error) {
		response.status(401);
	}
}
