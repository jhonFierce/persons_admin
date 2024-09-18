import Person from '../models/person';

const resolvers = {
  getPerson: async ({ id }: { id: string }) => {
    return await Person.findByPk(id);
  },
  getAllPersons: async () => {
    return await Person.findAll();
  },
  createPerson: async ({ nombres, apellidoP, apellidoM, direccion, telefono }: any) => {
    return await Person.create({ nombres, apellidoP, apellidoM, direccion, telefono });
  },
  updatePerson: async ({ id, ...updates }: any) => {
    const person = await Person.findByPk(id);
    if (person) {
      return await person.update(updates);
    }
    return null;
  },
  deletePerson: async ({ id }: { id: string }) => {
    const person = await Person.findByPk(id);
    if (person) {
      await person.destroy();
      return "Person deleted";
    }
    return "Person not found";
  }
};

export default resolvers;