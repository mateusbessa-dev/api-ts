import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateUserService } from '@/services/user';
import { z } from 'zod';

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = createUserSchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const createUserService = new CreateUserService(usersRepository)
    await createUserService.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) return reply.status(409).send({ message: error.message })
    throw error
  }


  return reply.status(201).send()
}