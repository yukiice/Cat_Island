const { sequelize } = require('../db/db')
const {
    Sequelize,
    Model
} = require('sequelize')

const classFields = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: Sequelize.INTEGER,
    title: Sequelize.STRING,
    type: Sequelize.TINYINT
}

class Movie extends Model {

}

Movie.init(classFields, {
    sequelize,
    tableName: 'movie'
})


class Sentence extends Model {

}

Sentence.init(classFields, {
    sequelize,
    tableName: 'sentence'
})

class Music extends Model {

}

Music.init(Object.assign({
    url: Sequelize.STRING
}, classFields), {
    sequelize,
    tableName: 'music'
})

module.exports = {
    Movie,
    Music,
    Sentence
}