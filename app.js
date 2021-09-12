const express = require('express');
const morgan = require('morgan')
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketio = require('socket.io');

const productsRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');
const userRouter = require('./routes/users');
const appointmentRouter = require('./routes/appointment');
const ticketRouter = require('./routes/tickets');
const quizRouter = require('./routes/quizzes');
const quizQuestionsRouter = require('./routes/quizQuestions');
const quizresultsRouter = require('./routes/quizResults');
const testResultsRouter = require('./routes/testResults');

const app = express();
const server = http.createServer(app)
// const io = socketio(server);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

require('dotenv/config');

const api = process.env.API_URL;



server.use(cors());


//Middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(morgan('tiny'));
server.use('/uploads', express.static(__dirname + '/uploads'));

// app.use()

//Routers
server.use(`${api}/products`, productsRouter);
server.use(`${api}/categories`, categoryRouter);
server.use(`${api}/users`, userRouter);
server.use(`${api}/appointments`, appointmentRouter);
server.use(`${api}/tickets`, ticketRouter);
server.use(`${api}/quizzes`, quizRouter);
server.use(`${api}/quiz/questions`, quizQuestionsRouter);
server.use(`${api}/quiz/results`, quizresultsRouter);
server.use(`${api}/test-results`, testResultsRouter);

//Database Connection
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connection is ready...')
    })
    .catch(err => {
        console.log('Database error', err)
    });
mongoose.set('useCreateIndex', true);


// Socket.io


io.on('connection', socket => {
    socket.emit('message', "welcome to chetcord");
    socket.broadcast.emit('message', 'a user has joined the chat.');
    socket.on("disconnect", () => {
        io.emit('message', 'a user has left the chat');
    });
    socket.on('chatMessage', msg => {
        io.emit('message', msg)
    })
});

//Server    
server.listen(4000, () => {
    console.log('Server running localhost:4000')
})

process.on('warning', (warning) => {
    console.log(warning.stack);
});
server.get('/', (req, res) => {
    return res.status(404).send('');
});
server.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            error: error.message,
            message: "Significant Error",
        },
    });
});