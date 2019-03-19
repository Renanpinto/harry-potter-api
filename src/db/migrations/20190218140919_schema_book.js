
exports.up = knex => knex.schema.createSchema('harry_potter');
exports.down = knex => knex.schema.dropSchema('harry_potter');
