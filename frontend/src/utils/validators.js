// Utilitários de Validação

/**
 * Valida um email
 * @param {string} email - Email a ser validado
 * @returns {boolean} True se o email for válido
 */
export const validateEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida um CEP brasileiro
 * @param {string} cep - CEP a ser validado
 * @returns {boolean} True se o CEP for válido
 */
export const validateCEP = (cep) => {
  if (!cep) return false;
  const cleaned = cep.replace(/\D/g, '');
  return cleaned.length === 8;
};

/**
 * Valida um telefone brasileiro
 * @param {string} phone - Telefone a ser validado
 * @returns {boolean} True se o telefone for válido
 */
export const validatePhone = (phone) => {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || cleaned.length === 11;
};

/**
 * Valida uma senha (mínimo 6 caracteres)
 * @param {string} password - Senha a ser validada
 * @returns {boolean} True se a senha for válida
 */
export const validatePassword = (password) => {
  if (!password) return false;
  return password.length >= 6;
};

/**
 * Valida se duas senhas são iguais
 * @param {string} password - Senha
 * @param {string} confirmPassword - Confirmação de senha
 * @returns {boolean} True se as senhas forem iguais
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  if (!password || !confirmPassword) return false;
  return password === confirmPassword;
};

/**
 * Valida se um campo está preenchido
 * @param {string} value - Valor a ser validado
 * @returns {boolean} True se o valor não estiver vazio
 */
export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

/**
 * Valida um número positivo
 * @param {number} value - Valor a ser validado
 * @returns {boolean} True se o valor for um número positivo
 */
export const validatePositiveNumber = (value) => {
  if (typeof value !== 'number') return false;
  return value > 0;
};

