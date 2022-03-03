import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { ICreateSessionDTO } from '../dtos/ICreateSessionDTO';
import { IResponseSessionDTO } from '../dtos/IResponseSessionDTO';
import configAuth from '../../../config/auth';

@injectable()
export class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSessionDTO): Promise<IResponseSessionDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMached = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMached) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = configAuth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
