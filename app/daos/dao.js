const daoCommon = require('./common/daoCommon')

// endpoints = ['book', 'author', 'publisher', 'genre', 'format']

// endpoints.forEach(endpoint => {
//     const ${endpoint}Dao = {
//         ...daoCommon,
//         ...require(`./api/${endpoint}Dao`)
//     }
// })
// I tried to streamline this but i hit a wall so i did it the old fashioned way seen below

const bookDao = {
    ...daoCommon,
    ...require('./api/bookDao')
}

const authorDao = {
    ...daoCommon,
    ...require('./api/authorDao')
}

const publisherDao = {
    ...daoCommon,
    ...require('./api/publisherDao')
}

const genreDao = {
    ...daoCommon,
    ...require('./api/genreDao')
}

const formatDao = {
    ...daoCommon,
    ...require('./api/formatDao')
}

module.exports = {
    bookDao,
    authorDao,
    publisherDao,
    genreDao,
    formatDao
}