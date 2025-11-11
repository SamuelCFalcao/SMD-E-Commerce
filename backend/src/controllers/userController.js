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

  // Login (simplificado)
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
}

module.exports = new UserController();

