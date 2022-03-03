import { CreateUserService } from './CreateUserService';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { CreateSessionService } from './CreateSessionService';
import { AppError } from '../../../shared/errors/AppError';
import { FakeCacheProvider } from '../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let createUser: CreateUserService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createSession: CreateSessionService;
let cacheProvider: FakeCacheProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    cacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      cacheProvider,
    );
    createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      phone: '11911111111',
      email: 'johndoe@example.com',
      password: '01020304',
    });

    const response = await createSession.execute({
      email: 'johndoe@example.com',
      password: '01020304',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      createSession.execute({
        email: 'johndoe@example.com',
        password: '01020304',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      phone: '11911111111',
      email: 'johndoe@example.com',
      password: '01020304',
    });

    await expect(
      createSession.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
