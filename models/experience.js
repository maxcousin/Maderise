/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('experience', {
    code_e: {
      type: DataTypes.INTEGER(20).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fonction: {
      type: 'VARCHAR(100)',
      allowNull: false
    },
    debut: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    remun: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    interess: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    avantage: {
      type: 'VARCHAR(500)',
      allowNull: true
    },
    motifDepart: {
      type: 'VARCHAR(500)',
      allowNull: true
    },
    vehFonc: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    vehServ: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    indemnDepl: {
      type: 'VARCHAR(100)',
      allowNull: true
    },
    repas: {
      type: DataTypes.FLOAT.UNSIGNED,
      allowNull: true
    },
    prime: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    autrePrime: {
      type: 'VARCHAR(200)',
      allowNull: true
    },
    problem: {
      type: 'VARCHAR(500)',
      allowNull: true
    },
    objectif: {
      type: 'VARCHAR(500)',
      allowNull: true
    },
    activite: {
      type: 'VARCHAR(500)',
      allowNull: true
    },
    resultat: {
      type: 'VARCHAR(500)',
      allowNull: true
  },
    nomSoc: {
      type: 'VARCHAR(50)',
      allowNull: true
    },
    lieuSoc: {
      type: 'VARCHAR(50)',
      allowNull: true
    },
    caSoc: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    nbSalSoc: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    nomContact: {
      type: 'VARCHAR(50)',
      allowNull: true
    },
    prenomContact: {
      type: 'VARCHAR(50)',
      allowNull: true
    },
    fctContact: {
      type: 'VARCHAR(50)',
      allowNull: true
    },
    numContact: {
      type: 'VARCHAR(10)',
      allowNull: true
    },
    permContact: {
      type: DataTypes.BOOLEAN,
      allowNull: true
  },
    dernierJob: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    code_p: {
      type: DataTypes.INTEGER(20).UNSIGNED,
      allowNull: true
    }
  }, {
    tableName: 'experience',
    timestamps: false,
    freezeTableName: true
  });
};
