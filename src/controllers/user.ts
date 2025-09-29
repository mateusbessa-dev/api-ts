import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UserAlreadyExistsError, UserNotFoundError } from '@/services/errors/users';
import { CreateUserService, FindOneUserService } from '@/services/user';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

const usersRepository = new PrismaUsersRepository()

export const findOne = async (request: FastifyRequest, reply: FastifyReply) => {
  const findOneUserSchema = z.object({
    id: z.uuid()
  })
  const { id } = findOneUserSchema.parse(request.params)

  try {
    const findOneUserService = new FindOneUserService(usersRepository)
    const { user } = await findOneUserService.execute(id)
    const { password_hash, ...userWithoutPassword } = user
    return reply.status(200).send({ user: userWithoutPassword })
  } catch (error) {
    if (error instanceof UserNotFoundError) return reply.status(409).send({ message: error.message })
    throw error
  }

}

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const { name, email, password } = createUserSchema.parse(request.body)

  try {
    const createUserService = new CreateUserService(usersRepository)
    await createUserService.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) return reply.status(409).send({ message: error.message })
    throw error
  }


  return reply.status(201).send()
}
