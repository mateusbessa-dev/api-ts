import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { createUserService } from '@/services/user';
import { z } from 'zod';

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = createUserSchema.parse(request.body)

  try {
    await createUserService({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    return reply.status(500).send()
  }


  return reply.status(201).send()
}