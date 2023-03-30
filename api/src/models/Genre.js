const { DataTypes } = require('sequelize');

module.exports = (sequalize) => {
  sequalize.define('genre', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
};
