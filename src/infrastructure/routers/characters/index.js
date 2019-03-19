import express from 'express';
import buildHandler from '../handler';
import GetAllCharacters from '../../factories/characters/get-all-factory';
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
        GetAllCharacters,
      ),
    );

  return charactersRouter;
};


export default router;
