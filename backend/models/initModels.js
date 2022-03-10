const DataTypes = require("sequelize").DataTypes;
const _user = require("./user");
const _list = require("./list");
const _card = require("./card");
const _checkList = require("./checkList");
const _cardComment = require("./cardComment");

function initModels(sequelize) {
  const user = _user(sequelize, DataTypes);
  const list = _list(sequelize, DataTypes);
  const card = _card(sequelize, DataTypes);
  const checkList = _checkList(sequelize, DataTypes);
  const cardComment = _cardComment(sequelize, DataTypes);

  return {
    user,
    list,
    card,
    checkList,
    cardComment,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;