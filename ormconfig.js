const isLocal = process.env.APP_ENV === 'local';

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    `./${isLocal ? 'src' : 'dist'}/modules/**/infra/typeorm/entities/*.${
      isLocal ? 'ts' : 'js'
    }`,
  ],
  migrations: [
    `./${isLocal ? 'src' : 'dist'}/shared/infra/typeorm/migrations/*.${
      isLocal ? 'ts' : 'js'
    }`,
  ],
  seeds: [
    `./${isLocal ? 'src' : 'dist'}/shared/infra/typeorm/seeds/*.${
      isLocal ? 'ts' : 'js'
    }`,
  ],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};
