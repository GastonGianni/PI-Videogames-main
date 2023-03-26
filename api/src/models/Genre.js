const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequalize) => {
  sequalize.define('genre', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
};
