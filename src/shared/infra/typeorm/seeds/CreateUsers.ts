import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../../../modules/users/infra/typeorm/entities/User';
import { container } from 'tsyringe';
import { BCryptHashProvider } from '../../../../modules/users/providers/HashProvider/implementations/BCryptHashProvider';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const users = [
      {
        id: '8cb23016-c66e-4d49-942f-62f4e746770f',
        name: 'Admin',
        phone: '11911111111',
        email: 'admin@fastprobr.com',
        password: '01020304',
      },
    ];

    for (const user of users) {
      const hasUser = await connection
        .createQueryBuilder()
        .select('user')
        .from(User, 'user')
        .where('user.email = :email', { email: user.email })
        .getOne();

      if (!hasUser) {
        const hashProvider = container.resolve(BCryptHashProvider);

        const password = await hashProvider.generateHash(user.password);

        await connection
          .createQueryBuilder()
          .insert()
          .into(User)
          .values([
            {
              id: user.id,
              name: user.name,
              phone: user.phone,
              email: user.email,
              password,
            },
          ])
          .execute();
      }
    }
  }
}
