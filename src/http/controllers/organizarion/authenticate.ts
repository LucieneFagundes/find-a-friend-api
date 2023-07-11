import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaOrganizarionsRepository } from "src/repositories/prisma/prisma-organizations-repository";
import { AuthenticateService } from "src/services/organization/authenticate";
import { z } from "zod";

export async function authenticate(
	request: FastifyRequest,
	response: FastifyReply
) {
	const authenticateOrganizationBodySchema = z.object({
		email: z.string().email(),
		password: z.string(),
	});

	const { email, password } = authenticateOrganizationBodySchema.parse(
		request.body
	);

	const organizationsRepository = new PrismaOrganizarionsRepository();
	const authenticateService = new AuthenticateService(organizationsRepository);

	const { org } = await authenticateService.execute({ email, password });

	const token = await response.jwtSign(
		{},
		{
			sign: {
				sub: org.id,
			},
		}
	);

	const refreshToken = await response.jwtSign(
		{},
		{
			sign: {
				sub: org.id,
				expiresIn: "1d",
			},
		}
	);

	return response
		.setCookie("refreshToken", refreshToken, {
			path: "/organizations/admin",
			secure: true,
			sameSite: true,
			httpOnly: true,
		})
		.status(200)
		.send({ token });
}
