var express = require('express'),
	 users = require('./routes/users');
var bodyParser = require('body-parser');
 
var app = express();
//app.configure(function () {
//    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
//});

 
//routes
app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.post('/users', users.addUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);
 
app.listen(process.env.PORT || 3000);
console.log('Listening...');