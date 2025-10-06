import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { UsersRepository } from "@/repositories/_interfaces/users-repository"

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput){
    const user = await prisma.user.create({
      data: data
    })
    return user
  }
  async update(id: string, data: Prisma.UserUpdateInput){
    const user = await prisma.user.update({
      where: { id: id },
      data: data
    })
    return user
  }
  async findOne(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    return user
  }
  async findMany() {
    const users = await prisma.user.findMany()
    return users
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    return user
  }
  async delete(id: string) {
    await prisma.user.delete({
      where: { id: id }
    })
  }
} 