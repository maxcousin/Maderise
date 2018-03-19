/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('postulant', {
    code_p: {
      type: DataTypes.INTEGER(20).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    log: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mdp: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sel: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profil: {
      type: DataTypes.ENUM('A','U'),
      allowNull: false
    },
    nom: {
      type: 'VARCHAR(40)',
      allowNull: true
    },
    prenom: {
      type: 'VARCHAR(60)',
      allowNull: true
    },
    nationalite: {
      type: 'VARCHAR(50)',
      allowNull: true
    },
    adresse: {
      type: 'VARCHAR(500)',
      allowNull: true
    },
    codePostal: {
      type: 'CHAR(5)',
      allowNull: true
    },
    ville: {
      type: 'VARCHAR(50)',
      allowNull: true
    },
    tel1: {
      type: 'CHAR(10)',
      allowNull: true
    },
    tel2: {
      type: 'CHAR(10)',
      allowNull: true
    },
    email: {
      type: 'VARCHAR(255)',
      allowNull: true
    },
    naissDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    naissLieu: {
      type: 'VARCHAR(50)',
      allowNull: true
    },
    numSecu: {
      type: 'CHAR(15)',
      allowNull: true
    },
    situationMari: {
      type: DataTypes.ENUM('Célibataire','Marié(e)'),
      allowNull: true
    },
    metierConj: {
      type: 'VARCHAR(50)',
      allowNull: true
    },
    photo: {
      type: 'VARCHAR(255)',
      allowNull: true
    },
    cv: {
      type: 'VARCHAR(255)',
      allowNull: true
    },
    motiv: {
      type: 'TEXT',
      allowNull: true
    },
    nbEnfant: {
      type: DataTypes.INTEGER(2).UNSIGNED,
      allowNull: true
    },
    naissEnfant: {
      type: 'VARCHAR(50)',
      allowNull: true
    },
    situationPro: {
      type: DataTypes.ENUM('Sans emploi','En poste'),
      allowNull: true
    },
    source: {
      type: 'VARCHAR(50)',
      allowNull: true
    },
    poste: {
      type: 'VARCHAR(50)',
      allowNull: true
    },
    remun: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: true
    },
    mobNor: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    mobEst: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    mobRa: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    mobSud: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    mobIdf: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    mobInt: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    mobDemen: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    mobGd: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    mobLocal: {
      type: 'VARCHAR(100)',
      allowNull: true
    },
    etam: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    cadre: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    cdi: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    cdd: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    nego: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dispo: {
      type: DataTypes.DATE,
      allowNull: true
    },
    nonConcu: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    convColl: {
      type: 'VARCHAR(100)',
      allowNull: true
    },
    dateEntretien: {
      type: DataTypes.DATE,
      allowNull: true
    },
    documents: {
      type: 'VARCHAR(2048)',
      allowNull: true
    },
    vivier: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'postulant',
    timestamps: false,
    freezeTableName: true
  });
};
