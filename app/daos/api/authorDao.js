const con = require('../../config/dbconfig')

const authorDao = {
    table: 'author',

    findBookByAuthor: (res, table, author)=> {
        con.execute(
            `SELECT b.book_id, b.title, b.copyright_year,
            b.edition, b.edition_year, b.binding, b.language, b.num_pages, b.cover_image, a.author, p.publisher
            FROM book b
            JOIN author a USING (author_id)
            JOIN publisher p USING (publisher_id)
            WHERE a.author_id =${author}       
            ORDER BY b.book_id;`,
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('Author Dao Error: ', error)
                }
            }
        )
    }
}

module.exports = authorDao