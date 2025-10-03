import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { UsersRepository } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput){
    const user = await prisma.user.create({
      data
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
        email
      }
    })
    return user
  }
  async delete(id: string) {
    await prisma.user.delete({
      where: { id }
    })
  }
} 