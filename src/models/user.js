const {sequelize} = require('../core/db')
const {Sequelize,Model} = require('sequelize')

class User extends Model {

}

User.init({
    id:{
      type:Sequelize.INTEGER,
      //  主键
      primaryKey:true,
        //自动增长
        autoIncrement:true
    },
    nickname:Sequelize.STRING,
    email: {
        type:Sequelize.STRING,
        unique:true
    },
    password:Sequelize.STRING,
    openid:{
        type:Sequelize.STRING(64),
        unique:true
    }
},{
    sequelize,
    tableName:'user'
})

module.exports = {
    User
}
