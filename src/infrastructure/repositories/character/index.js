import CharacterSchema from '../typeorm/schema/character';

class CharacterRepository {
  constructor(db) {
    this.db = db;
    this.entity = CharacterSchema;
  }

  async findAll(params = null) {
    const repository = await this.db.getRepository(this.entity);

    let result = null;
    let error = null;

    try {
      result = await repository.find(params);
    } catch (exception) {
      error = exception;
    }

    return { error, result };
  }
}

export default CharacterRepository;
