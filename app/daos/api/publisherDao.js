const con = require('../../config/dbconfig')

const publisherDao = {
    table: 'publisher',

    findBookByPublisher: (res, table, publisher)=> {
        con.execute(
            `SELECT ${table}.book_id, ${table}.title, ${table}.copyright_year,
            ${table}.edition, ${table}.edition_year, ${table}.binding, ${table}.language, ${table}.num_pages, ${table}.cover_image, a.author, p.publisher
            FROM ${table}
            JOIN author a USING (author_id)
            JOIN publisher p USING (publisher_id) 
            WHERE p.publisher_id =${publisher}        
            ORDER BY ${table}.book_id;`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log(`Publisher Dao Error: `, error)
                }
            }
        )
    }
}

module.exports = publisherDao