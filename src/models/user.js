const {sequelize} = require('../core/db')
const {Sequelize,Model} = require('sequelize')
const bcrypt  = require('bcryptjs')
class User extends Model {
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new global.errs.NotFound('账户不存在')
        }
    //    做密码比对
        const correct = bcrypt.compareSync(plainPassword,user.password)
        if (!correct){
            throw new global.errs.AuthFailed('密码不正确')
        }

        //最终还是需要返回user
        return user

    }
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
    password:{
        type:Sequelize.STRING,
        set(value) {
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(value,salt)
            this.setDataValue('password',psw)
        }
    },
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
