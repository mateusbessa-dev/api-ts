import { User, Prisma } from "@prisma/client"
import { UsersRepository } from "@/repositories/users-repository"

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []

  async findOne(id: string) {
    const user = this.users.find(user => user.id === id)
    if (!user) return null
    return user
  }

  async findMany(){
    const users = this.users
    if (!users) return []
    return users
  }

  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email)
    if (!user) return null
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id : `user-${Math.random()}`,
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }
    this.users.push(user)
    return user
  }
}