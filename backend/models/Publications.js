const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/groupomania');

module.exports = sequelize.define("publications", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey : true,
    autoIncrement :true
  },
  titre :{
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
  }
},
 {
  sequelize, 
  tableName: 'publications' 
 
});
