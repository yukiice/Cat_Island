module.exports = {
    environment: "dev",
    database:{
        dbName:'island',
        host:'localhost',
        port:3306,
        user:'root',
        password:'123456789'
    },
    security:{
        secretKey:"$6jiORlWa!k?YK",
        expiresIn:60*60*24
    },
    wx:{
        appId:'wx90e707b6bf368fd1',
        appSecret:'1163ae985c76c9598d1644e31fba0696',
        //https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
        loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }

}
