import CharacterService from '../../services/character';
import GetCharacterCommand from '../../../domain/commands/character/get-all-command';

class CharactersFactory {
  create() {
    return new GetCharacterCommand({
      repository: new CharacterService(),
    });
  }
}

export default CharactersFactory;
