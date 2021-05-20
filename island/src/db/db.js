const Sequelize = require('sequelize')

const {
    dbName,
    host,
    password,
    port,
    user
} = require('../config/config').database

const sequelize = new Sequelize(
    dbName,
    user,
    password, {
        dialect: 'mysql',
        host,
        port,
        // 控制台显示sql操作
        logging: true,
        // 时区问题
        timezone: '+08:00',
        define: {

        }
    },

)
sequelize.sync()

module.exports = {
    sequelize
}