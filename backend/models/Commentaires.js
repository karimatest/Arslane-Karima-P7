const { DataTypes, Model, Sequelize } = require('sequelize');
const sequelize = new Sequelize('mysql://root:@localhost:3306/groupomania');

module.exports = sequelize.define("commentaires", {
    content:{
        type: DataTypes.STRING,
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
        tableName: 'commentaires',
        //timestamps: false
      
      });
      
