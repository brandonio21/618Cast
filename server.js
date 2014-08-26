/* 
* server.js
* Written by Brandon Milton
* http://brandonio21.com
* 
* The purpose of this file is to handle any database interaction
* between the front-end and the mongo db
*/

// Initialize variables --------------------------
var express 	= require('express');
var app     	= express();
var mongoose 	= require('mongoose');
var morgan 	= require('morgan');
var bodyParser 	= require('body-parser');
var methodOverride = require('method-override');
var daemon 	= require('daemon')();

// Configuration of stuff

// connect to the mongo database
mongoose.connect('mongodb://localhost:27017/618castDb'); 

app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// Define the model
var Task = mongoose.model('Task', {
	task : String,
	creator : String
});

// Express Routes
app.get('/api/tasks', function(req, res) {
	// Use mongoose to get all tasks in the database
	Task.find(function(err, tasks) {
		// If there is an error, send error
		if (err)
			res.send(err);

		// no error
		res.json(tasks);
	});
});

// Create a task
app.post('/api/tasks', function(req, res) {
	// Use mongoose to create a task
	Task.create({
		task : req.body.text,
		creator : req.param('creator'),
		done : false
		}, function(err, task) {
			if (err)
				res.send(err);

			// Get the newly created thing
			Task.find(function(err, tasks) {
				if (err)
					res.send(err)
				res.json(tasks);
			});
		});
	});
		

// Delete a task
app.delete('/api/tasks/:task_id', function(req, res) {
	Task.remove({
		_id : req.params.task_id
		}, function(err, task) {
			if (err)
				res.send(err);

			Task.find(function(err, tasks) {
				if (err)
					res.send(err);
				res.json(tasks);
			});
		});
	});


			
		
//front end
app.get('*', function(req, res) {
	res.sendfile('./index.html');
});

// INITIALIZE!
app.listen(9097);
console.log("App started on port 9097");
