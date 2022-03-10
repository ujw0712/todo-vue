require('sequelize');
const crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "사용자 id"
    },
    uuid: {
      type: DataTypes.STRING(40),
      allowNull: false,
      comment: "uuid"
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "이메일"
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: "비밀번호"
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false,
      comment: "이름"
    },
    created_at: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "생성일시"
    },
    modified_at: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
      comment: "변경일시"
    },
    password_modified_at: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "비밀번호 변경일시"
    },
    login_at: {
      type: 'TIMESTAMP',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "로그인 일시"
    },
  }, {
    sequelize,
    tableName: 'todo_user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });

  user.prototype.verify = function (password) {
    // const hash = crypto.createHash("sha512").update(password).digest("base64");
    return new Promise((resolve, reject) => {
      const salt = Buffer.from(this.email, 'utf-8');

      crypto.pbkdf2(password, salt, 9999, 64, 'sha512', (err, key) => {
        if (err) {
          reject(err);
        }
        const hash = key.toString('base64')
        if (hash == this.password) {
          resolve(true)
        } else {
          resolve(false)
        }
      });
    });
  }

  return user;
}