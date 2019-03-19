exports.up = knex => Promise.all([
  knex.schema.withSchema('harry_potter').hasTable('character').then((exists) => {
    if (!exists) {
      return knex.schema.withSchema('harry_potter').createTable('character', (table) => {
        table
          .integer('id')
          .notNullable();

        table
          .string('name');

        table
          .string('species');

        table
          .string('gender');

        table
          .string('house');

        table
          .string('dateOfBirth');

        table
          .integer('yearOfBirth');

        table
          .string('ancestry');

        table
          .string('eyeColour');

        table
          .string('hairColour');

        table
          .string('patronus');

        table
          .boolean('hogwartsStudent');

        table
          .boolean('hogwartsStaff');

        table
          .string('actor');

        table
          .boolean('alive');

        table.primary(['id']);
      });
    }

    return null;
  }),
]);

exports.down = knex => knex.schema.withSchema('harry_potter').dropTableIfExists('character');
