import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import Person from '../models/person';
import { Op } from 'sequelize';

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: { type: GraphQLInt },
    nombres: { type: GraphQLString },
    apellidoP: { type: GraphQLString },
    apellidoM: { type: GraphQLString },
    direccion: { type: GraphQLString },
    telefono: { type: GraphQLString },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    persons: {
      type: new GraphQLList(PersonType),
      args: {
        nombres: { type: GraphQLString }, // Argument to filter by nombres
        apellidoP: { type: GraphQLString }, // Argument to filter by apellidoP
        apellidoM: { type: GraphQLString }  // Argument to filter by apellidoM
      },
      resolve: async (_, args) => {
        const filter:any = {
          where: Object.keys(args).reduce((acc: any, key:string) => {
            if (args[key]) {
              acc[key] = { [Op.like]: `%${args[key]}%`};
            }
            return acc;
          }, {})
        }
        return await Person.findAll(filter); // Retrieve filtered results
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPerson: {
      type: PersonType,
      args: {
        nombres: { type: GraphQLString },
        apellidoP: { type: GraphQLString },
        apellidoM: { type: GraphQLString },
        direccion: { type: GraphQLString },
        telefono: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const newPerson = await Person.create(args);
        return newPerson;
      },
    },
    updatePerson: {
      type: PersonType,
      args: {
        id: { type: GraphQLInt },
        nombres: { type: GraphQLString },
        apellidoP: { type: GraphQLString },
        apellidoM: { type: GraphQLString },
        direccion: { type: GraphQLString },
        telefono: { type: GraphQLString },
      },
      resolve: async (_, args) => {
        const person = await Person.findByPk(args.id);
        if (!person) {
          throw new Error('Person not found');
        }
        await person.update(args);
        return person;
      },
    },
    deletePerson: {
      type: GraphQLInt,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async (_, { id }) => {
        const personToDelete  = await Person.findByPk(id);
        if (!personToDelete ) {
          throw new Error('Person not found');
        }
        await personToDelete.destroy();
        return id;
      },
    }
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
