import 'dotenv/config';

/**
 * Configurações de ambiente da aplicação
 */
export const config = {
  // Server
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3001,
  host: process.env.HOST || '0.0.0.0',
  
  // Database
  databaseUrl: process.env.DATABASE_URL,
  
  // JWT
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',
  
  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // Bcrypt
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS, 10) || 10,
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // Helpers
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test'
};

/**
 * Valida se todas as variáveis de ambiente obrigatórias estão definidas
 */
export function validateEnvironment() {
  const required = [
    'JWT_SECRET',
    'REFRESH_TOKEN_SECRET'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `Variáveis de ambiente obrigatórias não definidas: ${missing.join(', ')}\n` +
      'Copie o arquivo .env.example para .env e configure as variáveis.'
    );
  }
}
