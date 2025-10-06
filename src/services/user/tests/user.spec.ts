import { InMemoryUsersRepository } from '@/repositories/adapters/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/users'
import { expect, describe, it } from 'vitest'
import { CreateUserService, FindOneUserService, FindManyUserService } from '../user'
import { compare } from 'bcryptjs'

describe('Find One User Service', () => {
  it('should be able to find one user by id', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    const { user } = await createUserService.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    })

    const findOneUserService = new FindOneUserService(usersRepository)
    const foundUser = await findOneUserService.execute(user.id)

    expect(foundUser.user.id).toEqual(expect.any(String)) // UUID
    expect(foundUser.user.name).toEqual('John Doe')
  })
/*   it('should not bring the user password', async () => {
  const usersRepository = new InMemoryUsersRepository()
  const createUserService = new CreateUserService(usersRepository)

  const { user } = await createUserService.execute({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123'
  })

  const findOneUserService = new FindOneUserService(usersRepository)
  const foundUser = await findOneUserService.execute(user.id)

  expect(foundUser.user).not.toHaveProperty('password_hash')
}) */
})

describe('Find All Users Service', () => {
  it('should be able to find all users', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    const { user } = await createUserService.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    })

    const findManyUserService = new FindManyUserService(usersRepository)
    const foundUsers = await findManyUserService.execute()

    console.log(foundUsers)

    expect(foundUsers).toHaveProperty('users')
    expect(foundUsers.users).toHaveLength(1)
  })
/*   it('should not bring the users password', async () => {
  const usersRepository = new InMemoryUsersRepository()
  const createUserService = new CreateUserService(usersRepository)

  const { user } = await createUserService.execute({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123'
  })

  const findManyUserService = new FindManyUserService(usersRepository)
  const foundUsers = await findManyUserService.execute()

  console.log(foundUsers)

  expect(foundUsers.users[0]).not.toHaveProperty('password_hash')
  expect(foundUsers.users).toHaveLength(1)
}) */
})

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


