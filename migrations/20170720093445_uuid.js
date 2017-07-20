
exports.up = function(knex, Promise) {

    return Promise.resolve()
    .then(() => {

        return knex.schema.createTable('uu_ids', (t) => {
            t.uuid('id').primary();
        });
    })
    .then(() => {

        return knex.schema.createTable('int_ids', (t) => {
            t.increments('id').primary().index();
        });
    });
};

exports.down = function(knex, Promise) {

    return knex.schema.dropTable('uu_ids')
    .then(() => knex.schema.dropTable('int_ids'));
};
