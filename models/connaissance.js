/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('connaissance', {
    code_c: {
      type: DataTypes.INTEGER(20).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    intitule: {
      type: 'VARCHAR(200)',
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('G','T','M','S','F','H','L','I'),
      allowNull: false
    }
  }, {
    tableName: 'connaissance',
    timestamps: false,
    freezeTableName: true
  });
};
