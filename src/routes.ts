import { FastifyInstance } from "fastify";
import { create, findOne, findMany, del } from "./controllers/user";

export const appRoutes = (app: FastifyInstance) => {
  app.get('/users/:id', findOne)
  app.get('/users', findMany)
  app.post('/users', create)
  app.delete('/users/:id', del)
}