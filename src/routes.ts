import { FastifyInstance } from "fastify";
import { create, findOne } from "./controllers/user";

export const appRoutes = (app: FastifyInstance) => {
  app.get('/users/:id', findOne)
  app.post('/users', create)
}