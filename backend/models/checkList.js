require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const checkList = sequelize.define('checkList', {
    check_list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "체크리스트 ID"
    },
    card_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'card',
        key: 'card_id'
      },
      comment: "카드 ID"
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "제목"
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      },
      comment: "생성자 id"
    },
    created_at: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일시"
    },
    modified_at: {
      type: 'TIMESTAMP',
      allowNull: true,
      defaultValue: null,
      comment: "변경일시"
    },
  }, {
    sequelize,
    tableName: 'todo_check_list',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "check_list_id" },
        ]
      },
    ]
  });

  return checkList;
}