import { FastifyInstance } from "fastify";
import { search } from "./search";

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', search)
}