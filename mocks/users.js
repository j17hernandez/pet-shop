const users = [
  {
    id: 1,
    name: 'Administrador',
    last_name: 'PetShop',
    username: 'admin',
    password: 'admin.1234',
  },
  {
    id: 2,
    name: 'Jorge',
    last_name: 'Hernández',
    username: 'jluhernandez',
    password: 'abcd.1234',
  },
]

export function generateMock() {
  localStorage.setItem('usuarios', JSON.stringify(users))
}
