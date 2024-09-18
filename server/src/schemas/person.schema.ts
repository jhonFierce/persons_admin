import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Person {
    id: ID!
    nombres: String!
    apellidoP: String!
    apellidoM: String!
    direccion: String!
    telefono: String!
  }

  type Query {
    getPerson(id: ID!): Person
    getAllPersons: [Person]
  }

  type Mutation {
    createPerson(nombres: String!, apellidoP: String!, apellidoM: String!, direccion: String!, telefono: String!): Person
    updatePerson(id: ID!, nombres: String, apellidoP: String, apellidoM: String, direccion: String, telefono: String): Person
    deletePerson(id: ID!): String
  }
`);

export default schema;