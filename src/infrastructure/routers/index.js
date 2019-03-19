import { createConnection } from 'typeorm';
import settings from '../../config';
import CharactersRouter from './characters';
import GetApiBooksRouter from './book/get-books';

export default async (app) => {
  try {
    await createConnection({ ...settings.db });
  } catch (error) {
    console.info('ERROR: ', error);
    throw new Error(error);
  } finally {
    const basePath = '/api/v1';

    app.use(`${basePath}/characters`, CharactersRouter());
    app.use(`${basePath}/books`, GetApiBooksRouter());
  }

  return app;
};
