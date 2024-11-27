import {connection, conn} from '../Database/Database.js';

const getCon =(req, res) => {
    conn.query('SELECT * FROM avi', (err, rows) => {
        if (err) {
            console.log('Error in query');
            return;
        }
        res.send(rows);
    });
};


const postcon = (req, res) => {
    const {id, name, city } = req.body;
    console.log(id,name, city);
    // conn.query(`INSERT INTO avi (id, name, city)  VALUES ('${id}', '${name}' , '${city}')`,  (err, rows) => {
        //     if (err) {
            //         console.log('Error in query');
            //         return;
            //     }
            //     res.send(rows);
            // });
    const query = `INSERT INTO avi VALUES (?,? ,?)`;
    conn.query(query, [id, name, city], (err, rows) => {
        if (err) {
            console.log('Error in query');
            return;
        }
        res.send(rows);
    });
}


const putcon = (req, res) => {
    const {id, name, city } = req.body;
    console.log(id,name, city);
    const query = `UPDATE avi SET name = ?, city = ? WHERE id = ?`;
    conn.query(query, [name, city, id], (err, rows) => {
        if (err) {
            console.log('Error in query');
            return;
        }
        res.send(rows);
    });
}

export {
    getCon,
    postcon,
    putcon
};