const con = require('../../config/dbconfig')

const genreDao = {
    table: 'genre',

    findBookByGenre: (res, table, genre)=> {
        con.execute(
            `SELECT b.book_id, b.title, g.genre_id, g.genre, b.copyright_year,
            b.edition, b.edition_year, b.binding, b.language, b.num_pages, b.cover_image, a.author, p.publisher
            FROM book b
            JOIN author a USING (author_id)
            JOIN publisher p USING (publisher_id)
            JOIN book_to_genre btg ON btg.book_id = b.book_id
            JOIN genre g ON g.genre_id = btg.genre_id
            WHERE g.genre_id =${genre}        
            ORDER BY b.book_id;`,
            (error, rows)=> {
                if (!error) {
                    res.json(rows)
                } else {
                    console.log(`Genre Dao Error: `, error)
                }
            }
        )
    }
}

module.exports = genreDao