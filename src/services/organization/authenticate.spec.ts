import { hash } from "bcryptjs";
import { InMemoryOrganizationsRepository } from "src/repositories/in-memory/in-memory-organizations-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthenticateService } from "./authenticate";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

let organizationRepository: InMemoryOrganizationsRepository;
let sut: AuthenticateService;

describe("Authenticate Service", () => {
	beforeEach(() => {
		organizationRepository = new InMemoryOrganizationsRepository();
		sut = new AuthenticateService(organizationRepository);
	});

	it("should be able to authenticate", async () => {
		await organizationRepository.create({
			name: "Lar do pet",
			email: "lar.pet@gmail.com",
			password_hash: await hash("123456", 6),
			telephone: "21988776655",
			city: "Queimados",
			street: "Rua A",
			neighborhood: "Glória",
			zip_code: "26350-564",
		});

		const { org } = await sut.execute({
			email: "lar.pet@gmail.com",
			password: "123456",
		});

		expect(org.id).toEqual(expect.any(String));
	});

	it("should not be able to authenticate with wrong email", async () => {
		await expect(() =>
			sut.execute({
				email: "lar.pet@gmail.com",
				password: "123456",
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it("should be able to authenticate with wrong password", async () => {
		await organizationRepository.create({
			name: "Lar do pet",
			email: "lar.pet@gmail.com",
			password_hash: await hash("123456", 6),
			telephone: "21988776655",
			city: "Queimados",
			street: "Rua A",
			neighborhood: "Glória",
			zip_code: "26350-564",
		});

		await expect(() =>
			sut.execute({
				email: "lar.pet@gmail.com",
				password: "wrong-password",
			})
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
