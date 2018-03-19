/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('connu', {
    code_p: {
      type: DataTypes.INTEGER(20).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    code_c: {
      type: DataTypes.INTEGER(20).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    niveau: {
      type: DataTypes.ENUM('Débutant','Autonome','Expert','Formateur'),
      allowNull: true
    },
    duree: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    obtention: {
      type: DataTypes.DATE,
      allowNull: true
    },
    expire: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lieu: {
      type: 'VARCHAR(200)',
      allowNull: true
    }
  }, {
    tableName: 'connu',
    timestamps: false,
    freezeTableName: true
  });
};
