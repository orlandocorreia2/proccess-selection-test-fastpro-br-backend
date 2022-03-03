import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { ensureAuthenticated } from '../../../../../shared/middlewares/ensureAuthenticated';
import { UsersController } from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

// usersRouter.use(ensureAuthenticated);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
