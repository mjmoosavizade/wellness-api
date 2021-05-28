const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');

const productsRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');

const app = express();

require('dotenv/config');

const api = process.env.API_URL;

app.options('*', cors());

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));
// app.use()

//Routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoryRouter)

//Database Connection
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connection is ready...')
    })
    .catch(err => {
        console.log('Database error', err)
    });

//Server    
app.listen(3000, () => {
    console.log('Server running localhost:3000')
})