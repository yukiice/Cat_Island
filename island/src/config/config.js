module.exports = {
    environment: 'dev',
    security: {
        secretKey: "$6jiORlWa!k?YK",
        expiresIn: 60 * 60 * 24
    },
    database: {
        dbName: 'island',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456789'
    },
    wx: {
        appId: 'wx90e707b6bf368fd1',
        appSecret: 'd77ae88df75505d05e6631707aaca456',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
}