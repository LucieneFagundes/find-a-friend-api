import { app } from "src/app";
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create an organization e2e", () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

  it("Should be able to create a new organization", async () => {
    const response = await request(app.server).post('/organizations').send({
      name: 'Lar animal',
      email: 'laranimal@gmail.com',
      password: 'laranimal',
      telephone: '21988778877',
      street: 'Rua A',
      neighborhood: 'Melão',
      city: 'Cidadela',
      zip_code: '21232222'
    })

    expect(response.statusCode).toEqual(201)
  })
});
