import * as path from 'path';
import * as PostgressConnectionStringParser from 'pg-connection-string';
import TypeOrmConfigFactory from '../orm/typeorm/typeorm-config-factory';

const connectionOptions = PostgressConnectionStringParser.parse(process.env.DATABASE_URL);


// const dotenv = require('dotenv');

// dotenv.load();

const config = {
  database: process.env.DATABASE_NAME || connectionOptions.database,
  host: process.env.DATABASE_HOST || connectionOptions.host,
  username: process.env.DATABASE_USER || connectionOptions.user,
  password: process.env.DATABASE_PASSWORD || connectionOptions.password,
  port: process.env.DATABASE_PORT || connectionOptions.port || 5432,
  entities: [path.resolve(__dirname, '../../infrastructure/repositories/typeorm/schema/**/index.js')],
  extra: {
    max: process.env.DATABASE_POOL_SIZE || 5,
  },
  logging: true,
  name: 'default',
  type: 'postgres',
};

const dbConfig = new TypeOrmConfigFactory(config).create();

export default {
  db: {
    ...dbConfig,
    logger: null,
    logging: true,
  },
  port: 8082,
};
