// Controller de Usuários
const userModel = require('../models/User');

class UserController {
  // Listar todos os usuários
  listAll(req, res) {
    try {
      const users = userModel.getAll();
      res.json({
        success: true,
        data: users
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Obter usuário por ID
  getById(req, res) {
    try {
      const { id } = req.params;
      const user = userModel.getById(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado'
        });
      }
      
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Criar novo usuário
  create(req, res) {
    try {
      const { name, email, password } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Nome, email e senha são obrigatórios'
        });
      }
      
      // Verificar se email já existe
      const existingUser = userModel.getByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: 'Email já cadastrado'
        });
      }
      
      const user = userModel.create({ name, email, password });
      
      // Criar sessão automaticamente após registro
      req.session.userId = user.id;
      req.session.userRole = user.role;
      
      res.status(201).json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Login com sessão
  login(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email e senha são obrigatórios'
        });
      }
      
      const user = userModel.getByEmail(email);
      if (!user || user.password !== password) {
        return res.status(401).json({
          success: false,
          error: 'Credenciais inválidas'
        });
      }
      
      // Criar sessão
      req.session.userId = user.id;
      req.session.userRole = user.role;
      
      const { password: _, ...userWithoutPassword } = user;
      res.json({
        success: true,
        data: userWithoutPassword
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Logout
  logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: 'Erro ao fazer logout'
          });
        }
        res.clearCookie('connect.sid');
        res.json({
          success: true,
          message: 'Logout realizado com sucesso'
        });
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Obter usuário atual (sessão)
  getCurrentUser(req, res) {
    try {
      if (!req.session || !req.session.userId) {
        return res.status(401).json({
          success: false,
          error: 'Usuário não autenticado'
        });
      }
      
      const user = userModel.getById(req.session.userId);
      if (!user) {
        req.session.destroy();
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado'
        });
      }
      
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Atualizar usuário
  update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      
      // Verificar se o usuário está tentando atualizar seu próprio perfil
      // ou se é um administrador
      if (req.user.role !== 'admin' && req.userId !== parseInt(id)) {
        return res.status(403).json({
          success: false,
          error: 'Você só pode atualizar seu próprio perfil'
        });
      }
      
      // Verificar se o email já está em uso por outro usuário
      if (email) {
        const existingUser = userModel.getByEmail(email);
        if (existingUser && existingUser.id !== parseInt(id)) {
          return res.status(400).json({
            success: false,
            error: 'Email já cadastrado'
          });
        }
      }
      
      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (password) updateData.password = password;
      
      const updatedUser = userModel.update(id, updateData);
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado'
        });
      }
      
      res.json({
        success: true,
        data: updatedUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Deletar usuário
  delete(req, res) {
    try {
      const { id } = req.params;
      
      // Verificar se o usuário está tentando deletar seu próprio perfil
      // ou se é um administrador
      if (req.user.role !== 'admin' && req.userId !== parseInt(id)) {
        return res.status(403).json({
          success: false,
          error: 'Você só pode deletar seu próprio perfil'
        });
      }
      
      const deleted = userModel.delete(id);
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Usuário não encontrado'
        });
      }
      
      // Se o usuário deletou seu próprio perfil, fazer logout
      if (req.userId === parseInt(id)) {
        req.session.destroy();
      }
      
      res.json({
        success: true,
        message: 'Usuário deletado com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new UserController();

