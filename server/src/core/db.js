const {Sequelize} =require('sequelize')
const {dbName,host,port,user,password}  = require('../config/config').database
const sequelize = new Sequelize(dbName,user,password,{
    dialect:'mysql',
    host,
    port,
//    操作过程是否显示
    logging:true,
//    时区
    timezone:"+08:00",
    define:{
        //创建 编辑 删除时间
        timestamps:true,
        //这代表不是硬删除  而是软删除
        paranoid:true,
    //    起别名
        createdAt:"created_at",
        updatedAt:"updated_at",
        deletedAt:"deleted_at",
        //携带下划线  但只有时间管用
        underscored:true
    }
})

sequelize.sync({
    //定期删除
    force:false
})
module.exports = {
    sequelize
}