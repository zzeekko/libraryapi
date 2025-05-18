const express = require('express')
const server = express()
const router = require('./app/routes/router')
const helmet = require('helmet')
const cors = require('cors')
const PORT = process.env.PORT || 4000


server.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false, 
    directives: {
        "img-src": ["'self'", "https: data"],
        "scriptSrc": ["'self'", "cdn.jsdelivr.net"]
    }
})
)

server.use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true}))

    
    server.get('/api', (req, res)=> {
        res.json({
            'Books': `http://localhost:${PORT}/api/book`,
            'Authors': `http://localhost:${PORT}/api/author`,
            'Publishers': `http://localhost:${PORT}/api/publisher`,
            'Genres': `http://localhost:${PORT}/api/genre`,
            'Formats': `http://localhost:${PORT}/api/format`
        })
    })
    
server.use('/', router)
server.set('view engine', 'handlebars')

server.listen(PORT, ()=> console.log(`No talking in Port ${PORT}.`))

