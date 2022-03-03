import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { CreateUserService } from '../../../services/CreateUserService';

export class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, phone, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      phone,
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}
