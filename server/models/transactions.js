'use strict'
module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    email: DataTypes.STRING,
    price: DataTypes.NUMBER,
    status: DataTypes.STRING,
    reason: DataTypes.STRING
  }, {})
  Transactions.associate = function (models) {
    // associations can be defined here
  }
  return Transactions
}
