import DB from '../../../db';
import CharacterRepository from '../../repositories/character';
import GetCharacterCommand from '../../../domain/commands/character/get-all-command';

class CharactersFactory {
  create() {
    return new GetCharacterCommand({
      repository: new CharacterRepository(new DB()),
    });
  }
}

export default CharactersFactory;
