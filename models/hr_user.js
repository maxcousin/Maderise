/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hr_user', {
    Code: {
      type: 'CHAR(15)',
      allowNull: false,
      defaultValue: '',
      primaryKey: true
    },
    Pwd: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Cout: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Society: {
      type: 'CHAR(4)',
      allowNull: true
    },
    Name: {
      type: 'CHAR(40)',
      allowNull: true
    },
    Surname: {
      type: 'CHAR(60)',
      allowNull: true
    },
    OverTime: {
      type: DataTypes.ENUM('Y','N','y','n'),
      allowNull: false,
      defaultValue: 'N'
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default.css'
    },
    Level: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: '10'
    },
    Groupe: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    cg_Admin: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true
    },
    Profil: {
      type: DataTypes.ENUM('A','C','U'),
      allowNull: true
    },
    Leaving: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true
    },
    LeavingDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    CarHorsePower: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    SellingPrice: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    EmployeeClass: {
      type: 'CHAR(2)',
      allowNull: true
    },
    email: {
      type: 'CHAR(255)',
      allowNull: true
    },
    CarHorsePowerClass: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    MultiSoc: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true
    },
    IsAdminOfficer: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false,
      defaultValue: 'N'
    },
    AdminOfficer: {
      type: 'CHAR(15)',
      allowNull: true
    },
    PartialTime: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false,
      defaultValue: 'N'
    },
    profilePicture: {
      type: 'VARCHAR(255)',
      allowNull: true
    },
    Adresse: {
      type: 'TEXT',
      allowNull: true
    },
    Tel1: {
      type: 'CHAR(10)',
      allowNull: true
    },
    Tel2: {
      type: 'CHAR(10)',
      allowNull: true
    },
    ICE_nom: {
      type: 'TEXT',
      allowNull: true
    },
    ICE_numero: {
      type: 'CHAR(10)',
      allowNull: true
    },
    ICE_mail: {
      type: 'TEXT',
      allowNull: true
    },
    Nom1: {
      type: 'TEXT',
      allowNull: true
    },
    Prenoms: {
      type: 'TEXT',
      allowNull: true
    },
    Naissance_date: {
      type: 'DATE',
      allowNull: true
    },
    Naissance_lieu: {
      type: 'TEXT',
      allowNull: true
    },
    Sexe: {
      type: 'TEXT',
      allowNull: true
    },
    Nationalite: {
      type: 'TEXT',
      allowNull: true
    },
    Info2_Num: {
      type: 'TEXT',
      allowNull: true
    },
    Info2_Date: {
      type: 'Date',
      allowNull: true
    },
    Info3_Num: {
      type: 'Text',
      allowNull: true
    },
    Info3_Date: {
      type: 'Date',
      allowNull: true
    },
    Situation1: {
      type: 'TEXT',
      allowNull: true
    },
    Enfants: {
      type: 'TINYINT(4)',
      allowNull: true
    },
    Info1: {
      type: 'TEXT',
      allowNull: true
    },
    VM_date: {
      type: 'Date',
      allowNull: true
    },
    VM_infos: {
      type: 'TEXT',
      allowNull: true
    },
    Next_VM_Date: {
      type: 'DATE',
      allowNull: true
    },
    Nature_VM: {
      type:'TEXT',
      allowNull: true
    },
    Info3: {
      type: 'TEXT',
      allowNull: true
    },
    Info4: {
      type: 'INT(11)',
      allowNull: true
    },
    Info5: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true
    },
    Contrat_type: {
      type: 'TEXT',
      allowNull: true
    },
    Contrat_duree: {
      type: 'TEXT',
      allowNull: true
    },
    Contrat_essai: {
      type: 'DATE',
      allowNull: true
    },
    Travail_type: {
      type: DataTypes.ENUM('Full','Partial'),
      allowNull: true
    },
    Travail_temps: {
      type: 'TINYINT(4)',
      allowNull: true
    },
    Remuneration1: {
      type: 'INT(11)',
      allowNull: true
    },
    Remuneration2: {
      type: 'TEXT',
      allowNull: true
    },
    Entree: {
      type: 'DATE',
      allowNull: true
    },
    Emploi: {
      type: 'TEXT',
      allowNull: true
    },
    Fonction: {
      type: 'TEXT',
      allowNull: true
    },
    Poste: {
      type: 'TEXT',
      allowNull: true
    },
    Processus: {
      type: 'TEXT',
      allowNull: true
    },
    Position: {
      type: 'INT(11)',
      allowNull: true
    },
    Coefficient: {
      type: 'INT(11)',
      allowNull: true
    },
    Locomotion: {
      type: 'TEXT',
      allowNull: true
    },
    Vehicule_type: {
      type: 'TEXT',
      allowNull: true
    },
    Vehicule_immat: {
      type: 'TEXT',
      allowNull: true
    },
    Permisc_type: {
      type: 'TEXT',
      allowNull: true
    },
    Permisc_num: {
      type: 'TEXT',
      allowNull: true
    },
    Cartegrise_num: {
      type: 'TEXT',
      allowNull: true
    },
    Formation: {
      type: 'TEXT',
      allowNull: true
    },
    Antenne: {
      type: 'TEXT',
      allowNull: true
    },
    Commentaires: {
      type: 'TEXT',
      allowNull: true
    },
    t_id_enr: {
      type: 'TEXT',
      allowNull: true
    },
    t_statut: {
      type: 'TEXT',
      allowNull: true
    },
    Categorie1: {
      type: 'TEXT',
      allowNull: true
    },
    Designation1: {
      type: 'TEXT',
      allowNull: true
    },
    Designation2: {
      type: 'TEXT',
      allowNull: true
    },
    Ref: {
      type: 'TEXT',
      allowNull: true
    },
    t_etat: {
      type: DataTypes.ENUM('Abandonné','Obsolète', 'Valide', 'Doublon'),
      allowNull: true
    },
    ICE_prenom: {
      type: 'TEXT',
      allowNull: true
    },
    AdressePlus: {
      type: 'TEXT',
      allowNull: true
    },
    CodePostal: {
      type: 'VARCHAR(10)',
      allowNull: true
    },
    Ville: {
      type: 'TEXT',
      allowNull: true
    },
    Pays: {
      type: 'TEXT',
      allowNull: true
    }
  }, {
    tableName: 'hr_user',
    timestamps: false,
    freezeTableName: true
  });
};
