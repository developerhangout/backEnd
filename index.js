const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

let Projects = require('./models/projects');
let Applications = require('./models/applications');
// let Applications = require('./models/applications');

require('dotenv').config();

// Setup Mongoose

const MONGO_URI = process.env.IS_PROD.length ? process.env.MONGO_PROD_HOST : process.env.MONGO_TEST_HOST ;

console.log(MONGO_URI);
mongoose.connect(MONGO_URI, { useNewUrlParser: true })
	.catch(e => console.log(e));
let db = mongoose.connection;
db.on('error', (err) => {
	console.log('mongo error');
	console.log(err);
});

// Setup App and BodyParser
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// GET Paths
app.get('/', (req, res) => {
	console.log('page opened');
	res.send('hello');
});

app.get('/project/all', (req, res) => {
	console.log('project get all hit')
	Applications.find({})
	.then((found) => {
		res.status(200).send(found);
	})
	.catch((err) => {
		console.log(err)
		res.status(404).send(err);
	})
});

app.get('/project/:id', (req, res) => {
	console.log('project get one hit')
	Applications.findById(req.params.id)
	.then((found) => {
		res.status(200).send(found);
	})
	.catch((err) => {
		console.log(err)
		res.status(404).send(err);
	})
});

app.get('/application/all', (req, res) => {
	console.log('application get all hit')
	Applications.find({})
	.then((found) => {
		res.status(200).send(found);
	})
	.catch((err) => {
		console.log(err)
		res.status(404).send(err);
	})
});

app.get('/application/:id', (req, res) => {
	console.log('application get one hit')
	Applications.findById(req.params.id)
	.then((found) => {
		res.status(200).send(found);
	})
	.catch((err) => {
		console.log(err)
		res.status(404).send(err);
	})
});



// POST Paths

app.post('/project/add', (req, res) => {
	console.log('project add hit')
	console.log(req.body)
	let project = new Projects();
	Object.assign(project, req.body);
	project.save((err) => {
		if (err) {
			console.log(err)
			res.status(404).send(err);
		} else {
			res.status(200).send('success');
		}
		return;
	});
});

app.post('/application/add', (req, res) => {
	console.log('application add hit')
	console.log(req.body)
	let application = new Applications();
	Object.assign(application, req.body);
	application.save((err) => {
		if (err) {
			console.log(err)
			res.status(404).send(err);
		} else {
			res.status(200).send('success');
		}
		return;
	});
});

// Functions


let port = 5501;
if (process.env.IS_PROD === 'true') {
	// TODO
}

app.listen(port, () => {
	console.log(`Server listening on port: ${port}`);
});