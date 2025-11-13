// Utilitários de Formatação

/**
 * Formata um número como moeda brasileira (R$)
 * @param {number} value - Valor numérico
 * @returns {string} Valor formatado como moeda
 */
export const formatCurrency = (value) => {
  if (typeof value !== 'number') {
    return 'R$ 0,00';
  }
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
};

/**
 * Formata uma data para o formato brasileiro
 * @param {string|Date} date - Data a ser formatada
 * @returns {string} Data formatada (dd/mm/yyyy)
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
};

/**
 * Formata uma data e hora para o formato brasileiro
 * @param {string|Date} date - Data a ser formatada
 * @returns {string} Data e hora formatada
 */
export const formatDateTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleString('pt-BR');
};

/**
 * Formata um CEP
 * @param {string} cep - CEP a ser formatado
 * @returns {string} CEP formatado (xxxxx-xxx)
 */
export const formatCEP = (cep) => {
  if (!cep) return '';
  const cleaned = cep.replace(/\D/g, '');
  if (cleaned.length !== 8) return cep;
  return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
};

/**
 * Formata um telefone
 * @param {string} phone - Telefone a ser formatado
 * @returns {string} Telefone formatado
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

/**
 * Trunca um texto para um número máximo de caracteres
 * @param {string} text - Texto a ser truncado
 * @param {number} maxLength - Número máximo de caracteres
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

