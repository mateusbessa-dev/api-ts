import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface CreateUserRequest {
  name: string,
  email: string,
  password: string,
}

export const createUserService = async ({ name, email, password }: CreateUserRequest) => {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    }
  })
  if (userWithSameEmail) throw new UserAlreadyExistsError()

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash
    }
  })
}