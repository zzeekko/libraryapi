const con = require('../../config/dbconfig')

const bookDao = {
    table: 'book',

    findBook: (res, table) => {
        con.execute(
            `SELECT ${table}.book_id, ${table}.title, a.author_id, a.author, p.publisher_id, p.publisher, ${table}.copyright_year, 
            ${table}.edition, ${table}.edition_year, ${table}.binding, ${table}.language, ${table}.rating, ${table}.num_pages, ${table}.cover_image, ${table}.qty
            FROM ${table}
            JOIN author a USING (author_id)
            JOIN publisher p USING (publisher_id)
            ORDER BY ${table}.book_id;`,
            (error, rows) => {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('Book Dao Error: ', error)
                }
            }
        )
    },

    findBookById: (res, table, id) => {
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid book id" });
        }
        let genres = [];
        let formats = [];

        con.execute(
            `SELECT b.book_id, g.genre
            FROM book b
            JOIN book_to_genre bg ON bg.book_id = b.book_id
            JOIN genre g ON g.genre_id = bg.genre_id
            WHERE b.book_id = ?;`,
            [id],
            (error, rows) => {
                if (!error) {
                    Object.values(rows).forEach(obj => {
                        genres.push(obj.genre);
                    });
                    con.execute(
                        `SELECT b.book_id, b.title, f.format_id, f.format
                        FROM book b
                        JOIN format f USING (format_id)
                        WHERE b.book_id = ?;`,
                        [id],
                        (error, rows) => {
                            if (!error) {
                                Object.values(rows).forEach(obj => {
                                    formats.push(obj.format);
                                });

                                con.execute(
                                    `SELECT b.book_id, b.title, a.author_id, a.author, p.publisher_id, p.publisher, b.copyright_year,
                                    b.edition, b.edition_year, b.binding, b.language, b.rating, b.num_pages, b.cover_image, b.qty
                                    FROM book b
                                    JOIN author a USING (author_id)
                                    JOIN publisher p USING (publisher_id)
                                    WHERE b.book_id = ?;`,
                                    [id],
                                    (error, rows) => {
                                        if (!error) {
                                            rows.forEach(row => {
                                                row.genres = genres;
                                                row.formats = formats;
                                            });
                                            console.log(rows)
                                            if (rows.length === 1) {
                                                res.json(...rows);
                                            } else {
                                                res.json(rows);
                                            }
                                        } else {
                                            console.log(`DAO Error: ${table} `, error);
                                        }
                                    }
                                );
                            } else {
                                console.log('DAO Error: ', error);
                            }
                        }
                    );
                } else {
                    console.log(error);
                }
            }
        );
    }


};

module.exports = bookDao