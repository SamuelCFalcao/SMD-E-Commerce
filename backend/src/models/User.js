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
      role: 'user',
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  update(id, userData) {
    const userIndex = this.users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
      return null;
    }
    
    // Não permitir alterar role através de update (exceto admin)
    const { role, ...dataToUpdate } = userData;
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...dataToUpdate,
      updatedAt: new Date().toISOString()
    };
    
    const { password, ...userWithoutPassword } = this.users[userIndex];
    return userWithoutPassword;
  }

  delete(id) {
    const userIndex = this.users.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
      return false;
    }
    this.users.splice(userIndex, 1);
    return true;
  }
}

module.exports = new UserModel();

