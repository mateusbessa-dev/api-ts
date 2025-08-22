# APP

GymPass style app

## RFs (Requisitos funcionais) (O que vai ser possível o usuário fazer na nossa aplicação. A funcionalidade em si)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio) (Caminhos que cada requisito pode tomar. Determina as condições da funcionalidade.)

- [ ] O usuário não pode se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por adminsitradores;

## RNFs (Requisitos não-funcionais) (Não partem do cliente, são requisitos técnicos)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persisitos em um PSQL.
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por páginas;
- [ ] Usuário identificado pelo JWT.

## Dependencias

npm i typescript @types/node tsx tsup -D
npx tsc --init