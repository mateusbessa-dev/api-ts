import { User, Prisma } from "@prisma/client"
import { UsersRepository } from "@/repositories/_interfaces/users-repository"

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

  async update(id: string, data: Prisma.UserUpdateInput) {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex === -1) return null

    const user = this.users[userIndex]

    const updatedUser = {
      ...user,
      ...data,
    }

    this.users[userIndex] = updatedUser as User

    return this.users[userIndex]
  }

  async delete(id: string) {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex === -1) return null
    this.users.splice(userIndex, 1)
  }
}