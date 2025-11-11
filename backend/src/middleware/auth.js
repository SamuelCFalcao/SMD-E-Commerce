// Middleware de autenticação simplificado
// Em produção, usar JWT ou sessões
const auth = (req, res, next) => {
  // Por enquanto, apenas simula autenticação
  // Em produção, verificar token JWT aqui
  const userId = req.headers['user-id'];
  
  if (!userId) {
    return res.status(401).json({
      success: false,
      error: 'Usuário não autenticado'
    });
  }
  
  req.userId = userId;
  next();
};

module.exports = auth;

