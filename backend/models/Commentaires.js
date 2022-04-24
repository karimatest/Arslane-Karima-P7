const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/groupomania');

module.exports = sequelize.define("commentaires", {
    content:{
        type: DataTypes.STRING,
        allowNull: false
    },
    date_commentaire:{
        type: DataTypes.DataTime,
        allowNull: false
    },
    publications_id:{
        type:DataTypes.INTEGER
    },
    user_id:{
        type: DataTypes.INTEGER
    }
    },
      
      { sequelize, 
        tableName: 'commentaires' 
      
      });
      
