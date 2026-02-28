/**
 * Middleware global de tratamento de erros
 */
export function errorHandler(error, request, reply) {
  const statusCode = error.statusCode || 500;
  
  // Log do erro
  request.log.error({
    error: error.message,
    stack: error.stack,
    url: request.url,
    method: request.method
  });

  // Resposta ao cliente
  reply.status(statusCode).send({
    error: {
      message: error.message || 'Erro interno do servidor',
      statusCode,
      timestamp: new Date().toISOString()
    }
  });
}
