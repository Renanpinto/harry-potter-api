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
          .string('date_of_birth');

        table
          .integer('year_of_birth');

        table
          .string('ancestry');

        table
          .string('eye_colour');

        table
          .string('hair_colour');

        table
          .string('patronus');

        table
          .boolean('hogwarts_student');

        table
          .boolean('hogwarts_staff');

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
