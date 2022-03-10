require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const cardComment = sequelize.define('cardComment', {
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "댓글 ID"
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
    comment: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "댓글"
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
    tableName: 'todo_card_comment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "comment_id" },
        ]
      },
    ]
  });

  return cardComment;
}