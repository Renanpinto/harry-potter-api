import express from 'express';
import buildHandler from '../handler';
import GetAllCharactersFactory from '../../factories/characters/get-all-factory';
import GetCharactersHousesFactory from '../../factories/characters/get-characters-houses-factory';
import Handler from '../../http/handler';

const charactersRouter = express.Router();

/* eslint-disable-next-line max-lines-per-function */
const router = () => {
  // @GET /api/v1/characters
  charactersRouter
    .route('/')
    .get(
      buildHandler(
        Handler,
        GetAllCharactersFactory,
      ),
    );

  // @GET /api/v1/characters/{student}
  charactersRouter
    .route('/:students')
    .get(
      buildHandler(
        Handler,
        GetAllCharactersFactory,
      ),
    );

  // @GET /api/v1/characters/houses/:house
  charactersRouter
    .route('/houses/:house')
    .get(
      buildHandler(
        Handler,
        GetCharactersHousesFactory,
      ),
    );

  return charactersRouter;
};


export default router;
