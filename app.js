const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');

const productsRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');
const userRouter = require('./routes/users');

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
app.use(`${api}/users`, userRouter)

//Database Connection
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connection is ready...')
    })
    .catch(err => {
        console.log('Database error', err)
    });
mongoose.set('useCreateIndex', true);


//Server    
app.listen(3000, () => {
    console.log('Server running localhost:3000')
})

process.on('warning', (warning) => {
    console.log(warning.stack);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            description: "Significant Error",
        },
    });
});