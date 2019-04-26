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
      const { error, result } = await this.repository.findAll(params);
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
