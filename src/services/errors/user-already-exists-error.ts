export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Já existe um usuário cadastrado com esse E-mail.')
  }
}