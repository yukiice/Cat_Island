const {
    LinValidator,
    Rule
} = require('../core/lin-validator')
    //导入user模型
const {
    User
} = require('../models/user')
    // 导入登录验证
const {
    LoginType
} = require('../lib/enums')
    // 校验正整数
class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super();
        this.id = [
            new Rule('isInt', '需要是正整数', {
                min: 1
            })
        ]
    }
}

//注册验证
class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule("isEmail", '不符合email规范')
        ]
        this.password1 = [
            new Rule('isLength', '密码最短6位字符，最长16个字符', {
                min: 6,
                max: 16
            }),
            // new Rule("matches","密码不符合规范","^(?![0-9]+$)(?![a-zA-z]+$)[0-9A-Za-z]")
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', '长度最短2位，最长8位', {
                min: 2,
                max: 8
            })
        ]
    }

    //    定义一个自定义函数验证规则  验证密码两次的密码是否相同
    validatePassword(vals) {
            const psw1 = vals.body.password1
            const psw2 = vals.body.password2
            if (psw1 !== psw2) {
                throw new Error('两个密码必须相同')
            }
        }
        //邮箱验证规则
    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            throw new Error('邮箱重复,用户已存在')
        }

    }

    //    token验证规则
}


//token验证
class TokenValidator extends LinValidator {
    constructor() {
            super();
            this.account = [
                new Rule('isLength', '不符合账号规则', {
                    min: 4,
                    max: 32
                })
            ]
            this.secret = [
                new Rule('isOptional'),
                new Rule('isLength', '至少6个字符', {
                    min: 6,
                    max: 128
                })
            ]



        }
        //    自定义校验规则
    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type必须是参数')
        }
        if (!LoginType.isThisTyPE(vals.body.type)) {
            throw new Error('type参数不合法')
        }
    }
}

class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', {
                min: 1
            })
        ]
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator
}