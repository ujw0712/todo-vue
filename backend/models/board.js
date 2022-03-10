require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const board = sequelize.define('board', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "게시글 ID"
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
      comment: "제목"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      comment: "내용"
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
    tableName: 'todo_board',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  return board;
}