import { Prisma, User } from "@prisma/client"

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findOne(id: string): Promise<User | null>
  findMany(): Promise<User[] | []>
  findByEmail(email: string): Promise<User | null>
  delete(id: string): Promise<void>
}