import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { expect, describe, it } from 'vitest'
import { CreateUserService } from './user'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Create User Service', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    const { user } = await createUserService.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    })

   expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    const { user } = await createUserService.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    })

    const isPasswordCorrectlyHashed = await compare('password123', user.password_hash)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  it('should not be able to register with an existing email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    const email = 'john.doe@example.com'

    await createUserService.execute({
      name: 'John Doe',
      email,
      password: 'password123'
    })

    await expect(() => 
      createUserService.execute({
      name: 'John Doe',
      email,
      password: 'password123'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError)


  })
})
