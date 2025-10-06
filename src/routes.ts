import { FastifyInstance } from "fastify";
import { findOne, findMany, create, update, del } from "./controllers/user";

export const appRoutes = (app: FastifyInstance) => {
  app.get('/users/:id', findOne)
  app.get('/users', findMany)
  app.post('/users', create)
  app.put('/users/:id', update)
  app.delete('/users/:id', del)
}