const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// var corsOptions = {
//     origin: 'http://localhost:8100',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodejs_api'
});

conn.connect((err) => {
    if (err) throw err;
});

app.get('/api/products/', (req, res) => {
    conn.query("SELECT * FROM products", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            
            res.send(JSON.stringify({
                "status"  : 200,
                "error"   : null,
                "response": result
            }));
            
        }
    });
});

app.get('/api/products/:id', (req, res) => {
    conn.query("SELECT * FROM products WHERE id_product = "+req.params.id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(JSON.stringify({
                "status"  : 200,
                "error"   : null,
                "response": result
            }));
        }
    })
})

app.post('/api/products/', (req, res) => {
    let data = { name: req.body.product_name, price: req.body.product_price };
    conn.query("INSERT INTO products SET ?", data, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(JSON.stringify({
                "status"  : 200,
                "error"   : null,
                "response": result
            }));
        }
    })
})

app.put('/api/products/:id', (req, res) => {
    conn.query("UPDATE products SET name = '"+req.body.product_name+"', price = "+req.body.product_price+" WHERE id_product = "+req.params.id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(JSON.stringify({
                "status"  : 200,
                "error"   : null,
                "response": result
            }));
        }
    });
});

app.delete('/api/products/:id', (req, res) => {
    conn.query("DELETE FROM products WHERE id_product = "+req.params.id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(JSON.stringify({
                "status"  : 200,
                "error"   : null,
                "response": result
            }));
        }
    });
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});