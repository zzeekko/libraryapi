const con = require('../../config/dbconfig')

const daoCommon = {

    findAll: (res, table)=> {
        con.execute(
            `SELECT * FROM ${table};`,
            (error, rows)=> {
                if (!error) {
                    // do stuff
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    // do something else
                    console.log('DAO ERROR: ', error )
                }
            }
        )
    },

    findById: (res, table, id)=> {
        con.execute(
            // i realized that my inconsistency with when i use "pub" and when i use "publisher" led to a problem here where it wont read "publisher_id" so i had to alter the database table. i couldn't figure out how to do it otherwise. i tried putting "pub" instead of dao.table but it made new issues.
            // ALTER TABLE publisher
            //  RENAME COLUMN pub_id TO publisher_id;
            `SELECT * FROM ${table} WHERE ${table}_id = ?;`,
            [id],
            (error, rows)=> {
                if (!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('DAO Error:', error)
                }
            } 
        )
    },

    countAll: (res, table)=> {
        con.execute(
            `SELECT COUNT(*) count FROM ${table};`,
            (error, rows)=> {
                if(!error) {
                    if (rows.length === 1) {
                        res.json(...rows)
                    } else {
                        res.json(rows)
                    }
                } else {
                    console.log('DAO Error: ', error)
                }
            }
        )
    },

    create: (req, res, table)=> {
        if (Object.keys(req.body).length === 0) {
            res.json({
                "error": true, 
                "message": "No fields to create"
            })
        } else {

            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            con.execute(
                `INSERT INTO ${table} SET ${fields.join(' = ?, ')} = ?;`,
                values,
                (error, dbres)=> {
                    if (!error) {
                        res.json({
                            Last_id: dbres.insertId
                        })
                    } else {
                        console.log(`${table}Dao error: `, error)
                    }
                }
            )
        }
    },

        patch: (req, res, table, id)=> {
        if (Object.keys(req.body).length === 0) {
            res.json({
                "error": true, 
                "message": "No fields to update"
            })
        } else {

            const fields = Object.keys(req.body)
            const values = Object.values(req.body)
            // I had to google this setClause thing, i dont take credit for the next line of code
            const setClause = fields.map(field => `${field} = ?`).join(', ') 
            values.push(id)

            con.execute(
                 `UPDATE ${table} SET ${setClause} WHERE ${table}_id = ?;`,
                values,
                (error, dbres)=> {
                    if (!error) {
                        res.json({
                            Last_id: dbres.insertId
                        })
                    } else {
                        console.log(`${table}Dao error: `, error)
                    }
                }
            )
        }
    }
}

module.exports = daoCommon