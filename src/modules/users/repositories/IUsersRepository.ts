import { User } from './../../users/infra/typeorm/entities/User';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
}
