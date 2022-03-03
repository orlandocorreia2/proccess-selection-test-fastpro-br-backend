import { User } from '../infra/typeorm/entities/User';

export interface IResponseSessionDTO {
  user: User;
  token: string;
}
