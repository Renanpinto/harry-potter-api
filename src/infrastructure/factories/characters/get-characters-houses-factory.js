import DB from '../../../db';
import CharacterRepository from '../../repositories/character';
import GetCharacterCommand from '../../../domain/commands/character/get-characters-houses-command';

class CharactersFactory {
  create() {
    return new GetCharacterCommand({
      repository: new CharacterRepository(new DB()),
    });
  }
}

export default CharactersFactory;
