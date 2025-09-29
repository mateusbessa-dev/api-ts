export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Já existe um usuário cadastrado com esse E-mail.')
  }
}
export class UserNotFoundError extends Error {
  constructor() {
    super('Usuário não encontrado.')
  }
}