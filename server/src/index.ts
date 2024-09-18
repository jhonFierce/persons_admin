import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphql/schema'; // Importa el esquema de GraphQL
import sequelize from './resolvers/database/config'; // Configuración de la base de datos
import Person from './models/person'; // Modelo de Person

// Sincronización de la base de datos y los modelos
const startServer = async () => {
  try {
    await sequelize.sync({ force: false }); // Sincroniza la base de datos (force: true recrea las tablas, úsalo solo en desarrollo)
    console.log('Database synced');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

startServer();

const app = express();

// Manually add CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// Middleware de GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,  // Interfaz gráfica para pruebas en GraphiQL
}));

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
