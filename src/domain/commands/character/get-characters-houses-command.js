import EventEmitter from 'events';
import EVENTS from '../../global/events';

const { success, internalError } = EVENTS;

class CharactersHousesCommand extends EventEmitter {
  constructor({ repository }) {
    super();
    this.repository = repository;
  }

  async execute(params) {
    try {
      const param = {};
      param.house = params.house.charAt(0).toUpperCase() + params.house.slice(1);
      const { error, result } = await this.repository.findAll(param);
      if (error) throw new Error(error);
      this.emit(success, result);
    } catch (exception) {
      console.log('CharacterCommand ', exception);
      this.emit(internalError, exception);
    }
  }
}

export default CharactersHousesCommand;
