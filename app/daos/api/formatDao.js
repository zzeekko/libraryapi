const con = require('../../config/dbconfig')

const formatDao = {
    table: 'format',

    findBookByFormat: (res, table, format)=>{
        con.execute(
            `SELECT b.book_id, b.title, f.format_id, f.format, b.copyright_year,
            b.edition, b.edition_year, b.binding, b.language, b.num_pages, b.cover_image, a.author, p.publisher
            FROM book b
            JOIN author a USING (author_id)
            JOIN publisher p USING (publisher_id)
            JOIN book_to_format btf ON btf.book_id = b.book_id
            JOIN format f ON f.format_id = btf.format_id
            WHERE f.format_id =${format}        
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

module.exports =  formatDao