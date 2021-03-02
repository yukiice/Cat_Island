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
    }
}
