import { FastifyInstance } from "fastify";
import { search } from "./search";
import { petDetail } from "./pet-detail";

export async function petsRoutes(app: FastifyInstance) {
	app.get("/pets/:id", petDetail);
	app.get("/pets", search);
}
