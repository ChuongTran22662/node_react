const express = require('express');
var bodyParser = require('body-parser')
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

const port = 4000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const { Pool } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'SanPham',
    password: 'TranChuong22662',
    port: 5432,
})

app.get('/', (req, res) => { })

app.get('/getdata01', (req, res, next) => {


    pool.query('SELECT * FROM product_info', (error, response) => {
        if (error) {
            console.log(error);
        }
        else {
            res.send(response.rows);
        }
    })
})

app.post('/add', function (req, res, next) {
    const product_name = req.body.product_name,
        product_price = req.body.product_price;


    pool.query("INSERT INTO product_info (product_name,product_price) values ($1,$2)", [product_name, product_price], (err, response) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send('insert success' + product_name + product_price);
        }
    })
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
