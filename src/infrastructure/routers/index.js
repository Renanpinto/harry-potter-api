import { createConnection } from 'typeorm';
import settings from '../../config';
import CharactersRouter from './characters';

export default async (app) => {
  try {
    await createConnection({ ...settings.db });
  } catch (error) {
    console.info('ERROR: ', error);
    throw new Error(error);
  } finally {
    const basePath = '/api/v1';

    app.use(`${basePath}/characters`, CharactersRouter());
  }

  return app;
};
