// Middleware de autenticação com sessão
const userModel = require('../models/User');

const auth = (req, res, next) => {
  // Verificar se o usuário está autenticado na sessão
  if (!req.session || !req.session.userId) {
    return res.status(401).json({
      success: false,
      error: 'Usuário não autenticado'
    });
  }
  
  // Verificar se o usuário ainda existe
  const user = userModel.getById(req.session.userId);
  if (!user) {
    req.session.destroy();
    return res.status(401).json({
      success: false,
      error: 'Usuário não encontrado'
    });
  }
  
  req.userId = req.session.userId;
  req.user = user;
  next();
};

// Middleware para verificar se é administrador
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Acesso negado. Apenas administradores podem acessar este recurso.'
    });
  }
  next();
};

// Middleware opcional - permite acesso se autenticado, mas não bloqueia se não estiver
const optionalAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    const user = userModel.getById(req.session.userId);
    if (user) {
      req.userId = req.session.userId;
      req.user = user;
    }
  }
  next();
};

module.exports = { auth, isAdmin, optionalAuth };

