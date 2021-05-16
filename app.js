var express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
var app = express();
const dotenv = require('dotenv');
const {
	errorConverter,
	errorHandler,
} = require('./middlewares/errorMiddleware');
const routes = require('./routes');

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// convert error to ApplicationError, if needed
app.use(errorConverter);
app.use(errorHandler);

app.use('/', routes);

let server;
var mongoDB = process.env.MONGOURI;
let port = 8081;
mongoose
	.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log(`Connected to mongo`);
		server = app.listen(port, () => {
			console.log(`Server running on ${port}`);
		});
	});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const exitHandler = () => {
	if (server) {
		server.close(() => {
			console.log('Server closed');
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error) => {
	console.log(error);
	exitHandler();
};

// Function to gracefully close mongoose connection
const gracefullyCloseConnection = async () => {
	mongoose.connection.close(() => {
		console.log('MongoDB connection is closed');
		process.exit(0);
	});
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', gracefullyCloseConnection);
process.on('SIGINT', gracefullyCloseConnection);

module.exports = app;
