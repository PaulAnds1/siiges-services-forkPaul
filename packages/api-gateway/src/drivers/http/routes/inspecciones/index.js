const { inspeccionesAdapter } = require('../../adapters');

const {
  createInspeccionSchema,
  findAllInspeccionPreguntasSchema,
  createInspeccionRespuestasSchema,
  createInspeccionObservacionSchema,
  deleteInspeccionSchema,
  createInspectoresProgramasSchema,
} = require('./schema');

async function inspeccionRouter(fastify, opts, next) {
  await fastify.post(
    '/',
    { schema: createInspeccionSchema },
    inspeccionesAdapter.createInspeccion,
  );

  await fastify.post(
    '/:inspeccionId/preguntas',
    { schema: createInspeccionRespuestasSchema },
    inspeccionesAdapter.createInspeccionRespuestas,
  );

  await fastify.get(
    '/preguntas',
    { schema: findAllInspeccionPreguntasSchema },
    inspeccionesAdapter.findAllInspeccionPreguntas,
  );

  await fastify.post(
    '/:inspeccionId/observaciones',
    { schema: createInspeccionObservacionSchema },
    inspeccionesAdapter.createInspeccionObservacion,
  );

  await fastify.delete(
    '/:inspeccionId',
    { schema: deleteInspeccionSchema },
    inspeccionesAdapter.deleteInspeccion,
  );

  await fastify.post(
    '/inspectores-programas',
    { schema: createInspectoresProgramasSchema },
    inspeccionesAdapter.createInspectoresProgramas,
  );

  next();
}

module.exports = inspeccionRouter;
