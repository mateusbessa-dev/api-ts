import { PrismaUsersRepository } from '@/repositories/adapters/prisma/prisma-users-repository';
import { UserAlreadyExistsError, UserNotFoundError } from '@/services/user/errors/users';
import { CreateUserService, FindOneUserService, FindManyUserService, DeleteUserService, UpdateUserService } from '@/services/user/user';
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

export const findMany = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const findManyUsersService = new FindManyUserService(usersRepository)
    const { users } = await findManyUsersService.execute()

    // Remove password_hash from each user object before sending the response
    const usersWithoutPassword = users.map(user => {
      const { password_hash, ...userWithoutPassword } = user
      return userWithoutPassword
    })

    return reply.status(200).send({ users: usersWithoutPassword })
  } catch (error) {
    if (error instanceof UserNotFoundError) return reply.status(404).send({message: error.message})
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

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const updateUserSchemaParams = z.object({
    id: z.uuid(),
  })
  const { id } = updateUserSchemaParams.parse(request.params)

  const updateUserSchemaBody = z.object({
    name: z.string().min(2).max(100).optional(),
    email: z.email().optional(),
    password: z.string().min(6).optional(),
  })
  const { name, email, password } = updateUserSchemaBody.parse(request.body)

  try {
    const updateUserService = new UpdateUserService(usersRepository)
    const { user } = await updateUserService.execute(id, { name: name, email: email, password: password })
    return reply.status(200).send({ user: user })
  } catch (error) {
    if (error instanceof UserNotFoundError) return reply.status(404).send({ message: error.message })
    throw error
  }
}

export const del = async (request: FastifyRequest, reply: FastifyReply) => {
  const deleteUserSchema = z.object({
    id: z.uuid(),
  })
  const { id } = deleteUserSchema.parse(request.params)

  try {
    const deleteUserService = new DeleteUserService(usersRepository)
    await deleteUserService.execute(id)
    return reply.status(204).send()
  } catch (error) {
    if (error instanceof UserNotFoundError) return reply.status(404).send({ message: error.message })
    throw error
  }
}

