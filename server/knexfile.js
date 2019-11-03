module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './database.db'
  },
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  },
  useNullAsDefault: true
};