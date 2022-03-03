import { container } from 'tsyringe';
import { RedisCacheProvider } from '../CacheProvider/implementations/RedisCacheProvider';
import { ICacheProvider } from '../CacheProvider/models/ICacheProvider';

const providers = {
  redis: RedisCacheProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis);
