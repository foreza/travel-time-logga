// npx sequelize-cli model:generate --name DataObject --attributes to:string,from:string,durationInSeconds:integer,timeStamp:date

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DataObject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DataObject.init({
    to: DataTypes.STRING,
    from: DataTypes.STRING,
    durationInSeconds: DataTypes.INTEGER,
    timeStamp: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'DataObject',
  });
  return DataObject;
};