require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const color = sequelize.define('color', {
    color_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "컬로 id"
    },
    color: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "컬러 코드"
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "정렬순서"
    },
  }, {
    sequelize,
    tableName: 'todo_color_code',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "color_id" },
        ]
      },
    ]
  });

  return color;
}