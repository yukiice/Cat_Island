const {
    sequelize
} = require('../db/db')

const {
    Sequelize,
    Model
} = require('sequelize')

class User extends Model {

}

User.init({
    // 主键不能重复 不能为空
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    openid: {
        type: Sequelize.STRING(64),
        // 设置为唯一
        unique: true
    }
}, {
    sequelize,
    tableName: 'user'
})