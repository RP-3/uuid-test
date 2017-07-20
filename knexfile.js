// Update with your config settings.

module.exports = {
  client: 'postgresql',
  connection: {
    database: 'uuid_test',
    user:     'rohanpethiyagoda',
  },
  pool: {
    min: 2,
    max: 2
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
