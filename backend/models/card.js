require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const card = sequelize.define('card', {
    card_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "카드 ID"
    },
    list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'list',
        key: 'list_id'
      },
      comment: "리스트 ID"
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "제목"
    },
    start_date: {
      type: 'TIMESTAMP',
      allowNull: true,
      defaultValue: null,
      comment: "시작일시"
    },
    end_date: {
      type: 'TIMESTAMP',
      allowNull: true,
      defaultValue: null,
      comment: "마감일시"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      comment: "내용"
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "정렬순서"
    },
    complete: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "완료여부"
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
    tableName: 'todo_card',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "card_id" },
        ]
      },
    ]
  });

  return card;
}