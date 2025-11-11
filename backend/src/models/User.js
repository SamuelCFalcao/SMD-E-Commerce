// Model de Usuário - Fonte de dados
class UserModel {
  constructor() {
    this.users = [
      {
        id: 1,
        name: 'Admin',
        email: 'admin@email.com',
        password: 'admin123', // Em produção, usar hash
        role: 'admin'
      }
    ];
  }

  getAll() {
    return this.users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  getById(id) {
    const user = this.users.find(user => user.id === parseInt(id));
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  getByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  create(userData) {
    const newUser = {
      id: this.users.length + 1,
      ...userData,
      role: 'user'
    };
    this.users.push(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}

module.exports = new UserModel();

