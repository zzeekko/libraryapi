const con = require('../../config/dbconfig')

const bookDao = {
    table: 'book',

    // redundant code. i realized i probably should have had the filters be here rather than in all of the other Daos, but it's done and it works fine.

    
    // findBook: (res, table)=> {
    //     con.execute(
    //         `SELECT ${table}.book_id, ${table}.title, a.author, p.publisher, ${table}.copyright_year,
    //         ${table}.edition, ${table}.edition_year, ${table}.binding, ${table}.language, ${table}.rating, ${table}.num_pages, ${table}.cover_image, ${table}.qty
    //         FROM ${table}
    //         JOIN author a USING (author_id)
    //         JOIN publisher p USING (publisher_id)        
    //         ORDER BY ${table}.book_id;`,
    //         (error, rows)=> {
    //             if (!error) {
    //                 if (rows.length === 1) {
    //                     res.json(...rows)
    //                 } else {
    //                     res.json(rows)
    //                 }
    //             } else {
    //                 console.log('Book Dao Error: ', error)
    //             }
    //         }
    //     )
    // }
}

module.exports = bookDao