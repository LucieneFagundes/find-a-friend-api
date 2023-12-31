import { InMemoryOrganizationsRepository } from "src/repositories/in-memory/in-memory-organizations-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateService } from "./create";
import { CredentialAlreadyExistsError } from "../errors/credential-already-exists.error";

let organizationRepository: InMemoryOrganizationsRepository;
let sut: CreateService;

describe("Create Organization Service", () => {
	beforeEach(() => {
		organizationRepository = new InMemoryOrganizationsRepository();
		sut = new CreateService(organizationRepository);
	});

	it("should be able to create an organization", async () => {
		const { organization } = await sut.execute({
			name: "example organization",
			email: "example@example.com",
			password: "123456",
			telephone: "21-9-8877-8878",
			street: "Rua A, 455",
			zip_code: "23030-380",
			neighborhood: "Jardim",
			city: "Queimados",
		});

		expect(organization.name).toEqual(expect.any(String));
	});

	it("should not be able to create an organization with same email twice", async () => {
		await sut.execute({
			name: "example organization",
			email: "example@example.com",
			password: "123456",
			telephone: "21-9-8877-8878",
			street: "Rua A, 455",
			zip_code: "23030-380",
			neighborhood: "Jardim",
			city: "Queimados",
		});

		await expect(() =>
			sut.execute({
				name: "example organization",
				email: "example@example.com",
				password: "123456",
				telephone: "21-9-8877-8878",
				street: "Rua A, 455",
				zip_code: "23030-380",
				neighborhood: "Jardim",
				city: "Queimados",
			})
		).rejects.toBeInstanceOf(CredentialAlreadyExistsError);
	});

	it("should not be able to create an organization with same telephone twice", async () => {
		await sut.execute({
			name: "example organization",
			email: "example@example1.com",
			password: "123456",
			telephone: "21-9-8877-8877",
			street: "Rua A, 455",
			zip_code: "23030-380",
			neighborhood: "Jardim",
			city: "Queimados",
		});

		await expect(() =>
			sut.execute({
				name: "example organization",
				email: "example@example2.com",
				password: "123456",
				telephone: "21-9-8877-8877",
				street: "Rua A, 455",
				zip_code: "23030-380",
				neighborhood: "Jardim",
				city: "Queimados",
			})
		).rejects.toBeInstanceOf(CredentialAlreadyExistsError);
	});
});
