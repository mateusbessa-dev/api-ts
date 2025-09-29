import { UserNotFoundError, UserAlreadyExistsError } from "./errors/users"
import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"

interface CreateUserRequest {
  name: string,
  email: string,
  password: string,
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