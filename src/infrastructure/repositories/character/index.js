import CharacterSchema from '../typeorm/schema/character';

class CharacterRepository {
  constructor(db) {
    this.db = db;
    this.entity = CharacterSchema;
  }

  async findAll() {
    const repository = await this.db.getRepository(this.entity);

    let result = [];
    let error = null;

    try {
      result = await repository.find();
    } catch (exception) {
      error = exception;
    }

    return { error, result };
  }

  async findById(params) {
    const repository = await this.db.getRepository(this.entity);

    let result = null;
    let error = null;

    try {
      result = await repository.findOne(params);
    } catch (exception) {
      error = exception;
    }

    return { error, result };
  }
}

export default CharacterRepository;
