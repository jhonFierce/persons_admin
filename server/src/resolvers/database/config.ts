import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/persons.db',  // Ubicación de la base de datos SQLite
});

export default sequelize;