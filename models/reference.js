/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reference', {
    code_r: {
      type: DataTypes.INTEGER(20).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: 'VARCHAR(40)',
      allowNull: false
    },
    prenom: {
      type: 'VARCHAR(60)',
      allowNull: false
    },
    fonction: {
      type: 'VARCHAR(100)',
      allowNull: true
    },
    tel: {
      type: 'CHAR(10)',
      allowNull: true
    },
    code_s: {
      type: DataTypes.INTEGER(20).UNSIGNED,
      allowNull: true
    },
    code_p: {
      type: DataTypes.INTEGER(20).UNSIGNED,
      allowNull: true
    }
  }, {
    tableName: 'reference',
    timestamps: false,
    freezeTableName: true
  });
};
