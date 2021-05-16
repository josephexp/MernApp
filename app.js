var express = require('express');
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
// app.get('/', function (req, res) {
// 	res.send('Hello World');
// });

var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = process.env.MONGOURI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/*
var myobj = { email: "Company Inc", password: "Highway 37" };
db.collection("mern-app").insertOne(myobj, function (err, res) {
  if (err) throw err;
  console.log("1 document inserted");
  db.close();
});


db.collection("mern-app").findOne(
  { email: "Company Inc" },
  function (err, res) {
    if (err) throw err;
    console.log(res);
    db.close();
  }
);

*/

// app.get("/api", async (req, res) => {
//   const surveys = await db
//     .collection("mern-app")
//     .findOne({ email: "Company Inc" });

//   res.send(surveys);
// });

// app.post("/api", async (req, res) => {
//   console.log(req.body);
//   const { email, password } = req.body;
//   const surveys = await db
//     .collection("mern-app")
//     .findOne({ email: email, password: password }, function (err, res2) {
//       if (err) {
//         res2.status(400).send({
//           success: false,
//           message: "login failed",
//         });
//       }
//     });
//   res.send(surveys);
// });

app.post('/api', async (req, res) => {
	console.log(req.body);
	const { email, password } = req.body;
	const surveys = await db
		.collection('mern-app')
		.findOne({ email: email, password: password });
	if (surveys) {
		res.send(surveys);
	} else {
		res.status(401).send({
			success: false,
			message: 'login failed',
		});
	}
});

app.post('/register', async (req, res) => {
	console.log(req.body);
	const { email, password } = req.body;
	db.collection('mern-app')
		.insertOne({ email, password })
		.then(() => {
			console.log('1 document inserted');
			db.close();
			res.status(200).send({
				success: true,
				message: 'Registration Successful',
				data: { email: email, password: password },
			});
		})
		.catch((error) => {
			res.status(200).send({
				success: false,
				message: 'Registration unSuccessful',
			});
		});
});

// var myobj = { email: "Company Inc", password: "Highway 37" };
// db.collection("mern-app").insertOne(myobj, function (err, res) {
//   if (err) throw err;
//   console.log("1 document inserted");
//   db.close();
// });

module.exports = app;
