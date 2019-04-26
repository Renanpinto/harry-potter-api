import EventEmitter from 'events';
import EVENTS from '../../global/events';

const { success, internalError, noContent } = EVENTS;

class CharacterCommand extends EventEmitter {
  constructor({ repository }) {
    super();
    this.repository = repository;
  }

  async execute(params) {
    try {
      const search = params;
      if (params.house) {
        search.house = params.house.charAt(0).toUpperCase() + params.house.slice(1);
      }
      const { error, result } = await this.repository.findAll(search);
      if (error) throw new Error(error);
      if (!result.length) {
        this.emit(noContent);
        return;
      }
      this.emit(success, result);
    } catch (exception) {
      console.log('CharacterCommand ', exception);
      this.emit(internalError, exception);
    }
  }
}

export default CharacterCommand;
