const {
    LinValidator,
    Rule,

} = require('../core/lin-validator')
const {
    User
} = require('../model/user')

const {
    LoginType
} = require('../lib/enum')


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

class ValidationInteger extends LinValidator {
    constructor() {
        super();
        this.id = [
            new Rule('isInt', '需要是正整数', {
                min: 1
            })
        ]
    }
}

// 登录验证
class RegisterValidator extends LinValidator {
    constructor() {
        super();
        this.email = [
            new Rule('isEmail', '不符合email规范')
        ]
        this.password1 = [
            new Rule('isLength', '密码至少6个字符，最多32个字符', {
                min: 6,
                max: 32
            })
            // new Rule("matches","密码不符合规范","^(?![0-9]+$)(?![a-zA-z]+$)[0-9A-Za-z]")
        ]
        this.password2 = this.password1
        this.nickname = [
            new Rule('isLength', '昵称不符合的长度规范', {
                min: 4,
                max: 32
            })
        ]
    }
    async validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if (psw1 !== psw2) {
            throw new Error('两次的密码必须相同')
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
}


// token验证
class TokenValidator extends LinValidator {
    constructor() {
        super()
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

    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type必须是参数')
        }
        if (!LoginType.isThisTyPE(vals.body.type)) {
            throw new Error('type参数不合法')
        }
    }
}


// 非空验证

class NoEmptyStringValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', { min: 1 })
        ]
    }
}

//验证参数

function  checkType(vals){
        if (!vals.body.type) {
            throw new Error('type必须是参数')
        }
        if (!LoginType.isThisTyPE(vals.body.type)) {
            throw new Error('type参数不合法')
        }
}

class  LikeValidator extends  PositiveIntegerValidator{
    constructor() {
        super();
        this.validateType = checkType
    }
}

module.exports = {
    ValidationInteger,
    RegisterValidator,
    TokenValidator,
    NoEmptyStringValidator,
    PositiveIntegerValidator,
    LikeValidator
}