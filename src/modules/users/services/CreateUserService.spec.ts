import { CreateUserService } from './CreateUserService';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { AppError } from '../../../shared/errors/AppError';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { FakeCacheProvider } from '../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let cacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    cacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      cacheProvider,
    );
  });

  it('should not be able to create a new user with same email from another', async () => {
    const email = 'johndoe@example.com';

    await createUser.execute({
      name: 'John Doe',
      phone: '11911111111',
      email,
      password: '01020304',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        phone: '11911111111',
        email,
        password: '01020304',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      phone: '11911111111',
      email: 'johndoe@example.com',
      password: '01020304',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');
  });
});
