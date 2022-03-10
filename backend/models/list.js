require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const list = sequelize.define('list', {
    list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "리스트 ID"
    },
    title: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "제목"
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "정렬순서"
    },
    created_at: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일시"
    },
    color: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "컬러코드"
    },
  }, {
    sequelize,
    tableName: 'todo_list',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "list_id" },
        ]
      },
    ]
  });

  return list;
}