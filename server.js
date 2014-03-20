var express = require('express'),
	 users = require('./routes/users');
var bodyParser = require('body-parser');
 
var app = express();
app.use(express.bodyParser());

 
//routes
app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.post('/users', users.addUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);
 
app.listen(3000);
console.log('Listening on port 3000...');