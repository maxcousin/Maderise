/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin_base', {
    Code: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      primaryKey: true,
      references: {
        model: '',
        key: ''
      }
    },
    Client: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Libelle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    T_Prevu: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    T_PrevuPrj: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    T_Passer: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Terminer: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true
    },
    Administ: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true
    },
    Cout: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Fourniture: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    HaveTask: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true
    },
    AffBase: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Afficher: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true
    },
    Groupe: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    Frais: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    TravelCharges: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true
    },
    Reference: {
      type: 'CHAR(30)',
      allowNull: true
    },
    Society: {
      type: 'CHAR(4)',
      allowNull: true
    },
    LinkTo: {
      type: 'CHAR(15)',
      allowNull: true
    },
    OwnerID: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    taskClass: {
      type: 'CHAR(2)',
      allowNull: true
    },
    Avancement: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Progression: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    Vacation: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true
    },
    Recup: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true
    },
    Sick: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true
    },
    RecupHS: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true
    },
    Created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    DeadLine: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Responsable: {
      type: 'CHAR(15)',
      allowNull: true
    },
    Status: {
      type: 'CHAR(2)',
      allowNull: true
    },
    Multiple: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Estimated: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: false
    },
    BusinessGroup: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true,
      defaultValue: 'N'
    },
    RootBusiness: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true,
      defaultValue: 'N'
    },
    ItsTask: {
      type: DataTypes.ENUM('Y','N'),
      allowNull: true,
      defaultValue: 'Y'
    }
  }, {
    tableName: 'admin_base',
    timestamps: false,
    freezeTableName: true
  });
};
