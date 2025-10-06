import { appRoutes } from "@/routes";
import z, { ZodError } from "zod";
import fastify from "fastify";

export const app = fastify();

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  console.log(error)
  if (error instanceof ZodError) {
    return reply.status(400).send({
      statusCode: 400,
      message: "Validation error",
      issues: z.treeifyError(error),
    })
  }
  return reply.status(500).send({
    statusCode: 500,
    message: "Internal server error",
  })
})