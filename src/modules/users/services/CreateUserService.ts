import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { User } from '../infra/typeorm/entities/User';
import { AppError } from '../../../shared/errors/AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { ICacheProvider } from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    phone,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const hasUser = await this.usersRepository.findByEmail(email);

    if (hasUser) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    this.cacheProvider.invalidatePrefix('users');

    return user;
  }
}
