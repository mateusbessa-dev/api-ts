import { FastifyInstance } from "fastify";
import { create } from "./controllers/user";

export const appRoutes = (app: FastifyInstance) => {
  app.post('/users', create)
}