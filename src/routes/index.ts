/**
 * Esse arquivo index dentro da pasta de rotas (routes) é o arquivo que centraliza todas as
 * rotas da aplicacao, dentro da pasta routes as rotas sao criadas, contudo as rotas so sao acionadas
 * se colocadas dentro do index, pois ele centraliza e direcionada cada requisição para a rota correta
 *
 */

import { Router } from 'express';
import appointmentsRouter from './appointments.routes'; // primeira roda de uma entidade da aplicacao
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

// quando chegar uma requisicao em des.: http://localhost:3333/appointments sera direcionada
// para a rota appointments.routes.ts pois eh ela que expoe o objeto de rota appointmentsRouter
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
