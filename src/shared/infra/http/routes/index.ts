import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users_routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions_routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.get('/', (_, response) =>
  response.json({ message: process.env.APP_NAME }),
);

export default routes;
