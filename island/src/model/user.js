const {
    sequelize
} = require('../db/db')

const {
    Sequelize,
    Model
} = require('sequelize')

const bcrypt = require('bcryptjs')

class User extends Model {
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new global.errs.NotFound('用户不存在')
        }
        // 存在该用户
        const correct = bcrypt.compareSync(plainPassword, user.password)

        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user
    }
}

User.init({
    // 主键不能重复 不能为空
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(8)
                // model 内部的属性操作
            const psw = bcrypt.hashSync(val, salt)
                // 赋值
            this.setDataValue('password', psw)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        // 设置为唯一
        unique: true
    }
}, {
    sequelize,
    tableName: 'user'
})


module.exports = {
    User
}