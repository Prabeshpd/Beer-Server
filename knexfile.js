// Update with your config settings.

module.exports = {
  development: {
    client: 'mssql',
    connection: {
      database: 'beer',
      user: 'sa',
      password: 'Admin@1234',
      server: 'localhost'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'mssql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
      server: 'localhost'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mssql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
