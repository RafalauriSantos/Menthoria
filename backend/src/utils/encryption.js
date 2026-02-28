import bcrypt from 'bcrypt';
import { config } from '../config/environment.js';

/**
 * Gera hash de uma senha
 * @param {string} password - Senha em texto plano
 * @returns {Promise<string>} Hash da senha
 */
export async function hashPassword(password) {
  return bcrypt.hash(password, config.bcryptRounds);
}

/**
 * Compara senha com hash
 * @param {string} password - Senha em texto plano
 * @param {string} hash - Hash armazenado
 * @returns {Promise<boolean>} True se a senha corresponde ao hash
 */
export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}
