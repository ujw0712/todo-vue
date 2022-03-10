require('sequelize');

module.exports = function(sequelize, DataTypes) {
  const chat = sequelize.define('chat', {
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "대화 ID"
    },
    message: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      defaultValue: '',
      comment: "내용"
    },
    linked_file_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "연관 첨부파일 ID"
    },
    linked_og_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "연관 OpenGraph ID"
    },
    linked_card_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      references: {
        model: 'card',
        key: 'card_id'
      },
      comment: "연관 카드 ID"
    },
    linked_card_detail: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      defaultValue: '',
      comment: "연관 카드 상세"
    },
    org_chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "원본 대화 ID"
    },
    org_file_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "원본 첨부파일 ID"
    },
    org_text: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      defaultValue: '',
      comment: "원본 대화 내용/카드 제목"
    },
    org_card_detail: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      defaultValue: '',
      comment: "원본 카드 상세"
    },
    type: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "유형"
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "상태"
    },
    isBot: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      comment: "시스템 메시지 여부"
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
    tableName: 'todo_chat',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chat_id" },
        ]
      },
    ]
  });

  return chat;
}