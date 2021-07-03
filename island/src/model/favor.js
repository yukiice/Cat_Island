const {
    sequelize
} = require('../db/db')
const {
    Sequelize,
    Model
} = require('sequelize')
const { Art } = require('./art')

class Favor extends Model {
    // 业务表

    static async like() { //喜欢
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if (favor) {
            throw new global.errs.LikeError()
        }
        sequelize.transaction(t => {
            Favor.create({
                art_id,
                type,
                uid
            }, { transaction: t })
            const art = Art.getData(art_id, type)
            art.increment('fav_nums', { by: 1, transaction: t })
        })
    }

    static async disLike() { // 不喜欢

    }
}

Favor.init({
    uid: Sequelize.STRING,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'favor'
})


module.exports = {
    Favor
}