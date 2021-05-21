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
            // 时间戳是否显示
            timestamps: false,
            // 开启软删除
            paranoid: true,
            // 开启自定义命名
            underscored: true,
            createAt: 'create_at',
            updateAt: 'update_at',
            deleteAt: 'delete_at'
        }
    },

)
sequelize.sync({
    force: true
})

module.exports = {
    sequelize
}