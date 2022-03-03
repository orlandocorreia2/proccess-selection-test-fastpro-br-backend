import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { ICreateUserDTO } from '../../../dtos/ICreateUserDTO';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: { email },
    });

    return user;
  }

  public async create({
    name,
    phone,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      phone,
      email,
      password,
    });

    await this.repository.save(user);

    return user;
  }
}
