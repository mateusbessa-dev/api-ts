import { UserNotFoundError, UserAlreadyExistsError } from "./errors/users"
import { UsersRepository } from "@/repositories/_interfaces/users-repository"
import { hash } from "bcryptjs"

interface CreateUserRequest {
  name: string,
  email: string,
  password: string,
}
interface UpdateUserRequest {
  name?: string,
  email?: string,
  password?: string,
}

export class FindOneUserService {
  constructor(private usersRepository: UsersRepository){}

  async execute(id: string){
    const user = await this.usersRepository.findOne(id)
    if (!user) throw new UserNotFoundError()
    return {
      user,
    }
  }

}

export class FindManyUserService {
  constructor(private usersRepository: UsersRepository){}

  async execute() {
    const users = await this.usersRepository.findMany()
    if (!users) throw new UserNotFoundError()
    return {
      users,
    }
  }
}

export class CreateUserService {
  constructor(private usersRepository: UsersRepository ) {}

  async execute({ name, email, password }: CreateUserRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) throw new UserAlreadyExistsError()

    const user = await this.usersRepository.create({
        name,
        email,
        password_hash,
    })

    return {
      user,
    }
}
}

export class UpdateUserService {
  constructor(private usersRepository: UsersRepository){}

  async execute(id: string, { name, email, password }: UpdateUserRequest){
    const user = await this.usersRepository.findOne(id)
    if (!user) throw new UserNotFoundError()
    const password_hash = password ? await hash(password, 6) : undefined
    const userWithSameEmail = email ? await this.usersRepository.findByEmail(email) : null
    if (userWithSameEmail && userWithSameEmail.id !== id) throw new UserAlreadyExistsError()
    const updatedUser = await this.usersRepository.update(id, {
      name,
      email,
      password_hash,
    })
    return {
      user: updatedUser,
    }
  }
}

export class DeleteUserService {
  constructor(private usersRepository: UsersRepository){}

  async execute(id:string){
    const user = await this.usersRepository.findOne(id)
    if (!user) throw new UserNotFoundError()
    await this.usersRepository.delete(id)
    return 
  }
}