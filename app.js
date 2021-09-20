const express = require('express');
const morgan = require('morgan')
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const webpush = require('web-push');

const productsRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');
const userRouter = require('./routes/users');
const appointmentRouter = require('./routes/appointment');
const ticketRouter = require('./routes/tickets');
const quizRouter = require('./routes/quizzes');
const quizQuestionsRouter = require('./routes/quizQuestions');
const quizresultsRouter = require('./routes/quizResults');
const testResultsRouter = require('./routes/testResults');
const { Message } = require('./models/messages');

const app = express();
const server = http.createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});




require('dotenv/config');

const api = process.env.API_URL;
const publicVapidKey = 'BPBc8omBrJ-NtB_XcIW0S_QS4pVe_dNVECdvRiDWH3DsIQF2CshhYYUgep2U9DWlu7Huns5dzkrlypdRIrIgp8Q';
const privateVapidKey = process.env.PRIVATE_KEY;


app.use(cors());


//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));
app.use('/uploads', express.static(__dirname + '/uploads'));

// app.use()

//Routers
app.use(`${api}/products`, productsRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/appointments`, appointmentRouter);
app.use(`${api}/tickets`, ticketRouter);
app.use(`${api}/quizzes`, quizRouter);
app.use(`${api}/quiz/questions`, quizQuestionsRouter);
app.use(`${api}/quiz/results`, quizresultsRouter);
app.use(`${api}/test-results`, testResultsRouter);

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
    // socket.emit('message', "welcome to chetcord");
    // socket.broadcast.emit('message', 'a user has joined the chat.');
    socket.on("disconnect", () => {
        // io.emit('message', 'a user has left the chat');
    });
    socket.on('chatMessage', msg => {
        console.log(msg)
        const message = new Message({
            message: msg.message,
            user: msg.user,
        });
        message.save().then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
        io.emit('message', msg)
    })
});

//Web-Push
webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
);

app.post(`${api}/subscribe`, (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;
    console.log(subscription);
    console.log(Object.keys(subscription)[0].endpoint);
    // Send 201 - resource created
    res.status(201).json({});

    // Create payload
    const payload = JSON.stringify({ title: "یادآوری" });

    // Pass object into sendNotification
    webpush
        .sendNotification(Object.keys(subscription)[0], payload)
        .catch(err => console.error(err));
});


app.use(`${api}/messages/:id`, (req, res) => {
    Message.find({ user: req.params.id }).exec()
        .then(result => {
            if (result.length >= 1) {
                res.status(200).json({ success: true, data: result });
            } else {
                res.status(404).json({ success: false, message: "No content" });
            }
        })
        .catch(err => {
            res.status(404).json({ success: false, message: "Error getting the messages" });
        });
});

//Server    
server.listen(4000, () => {
    console.log('Server running localhost:4000')
})

process.on('warning', (warning) => {
    console.log(warning.stack);
});
app.get('/', (req, res) => {
    return res.status(404).send('');
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            error: error.message,
            message: "Significant Error",
        },
    });
});