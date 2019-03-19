import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  columns: {
    id: {
      primary: true,
      type: 'integer',
    },
    name: {
      type: 'varchar',
    },
    species: {
      type: 'varchar',
    },
    gender: {
      type: 'varchar',
    },
    house: {
      type: 'varchar',
    },
    dateOfBirth: {
      type: 'varchar',
    },
    yearOfBirth: {
      type: 'integer',
    },
    ancestry: {
      type: 'varchar',
    },
    eyeColour: {
      type: 'varchar',
    },
    hairColour: {
      type: 'varchar',
    },
    patronus: {
      type: 'varchar',
    },
    hogwartsStudent: {
      type: 'boolean',
    },
    hogwartsStaff: {
      type: 'boolean',
    },
    actor: {
      type: 'varchar',
    },
    alive: {
      type: 'boolean',
    },
  },
  name: 'Character',
  schema: 'harry_potter',
  tableName: 'character',
  target: 'Character',
});
