import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { SessionsController } from '../controllers/SessionsController';

const sessionsController = new SessionsController();

const usersRouter = Router();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default usersRouter;
