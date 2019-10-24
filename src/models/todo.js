module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "todo",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true
      },
      task: {
        type: DataTypes.STRING
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
      },
      update_at: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
      }
    },
    {
      paranoid: true, // won't do real deletion in database just give timestamp
      underscored: true // attribute name is update_at for example
    }
  );
}