import { DataTypes, Model } from 'sequelize';
import sequelize from '../resolvers/database/config';

class Person extends Model {
  public id!: number;
  public nombres!: string;
  public apellidoP!: string;
  public apellidoM!: string;
  public direccion!: string;
  public telefono!: string;
}

Person.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidoP: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidoM: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'persons',
});

export default Person;