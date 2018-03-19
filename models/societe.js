/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('societe', {
    code_s: {
      type: DataTypes.INTEGER(20).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    intitule: {
      type: 'VARCHAR(100)',
      allowNull: false
    },
    lieu: {
      type: 'VARCHAR(200)',
      allowNull: false
    },
    ca: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    nbSalarie: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    }
  }, {
    tableName: 'societe',
    timestamps: false,
    freezeTableName: true
  });
};
