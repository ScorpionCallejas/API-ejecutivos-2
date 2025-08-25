// Lista de tokens válidos
const validTokens = new Set([
  'abc123def456',
  'xyz789uvw012', 
  'token_cliente_1',
  'token_cliente_2',
  'callejas'
]);

const tokenAuth = (req, res, next) => {
  const token = req.header('x-api-token') || req.header('Authorization');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token requerido'
    });
  }

  if (!validTokens.has(token)) {
    return res.status(403).json({
      success: false,
      message: 'Token inválido'
    });
  }

  next();
};

module.exports = tokenAuth;