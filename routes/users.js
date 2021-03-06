//users.js

var mongo = require('mongodb');
var Server = mongo.Server,
	Db = mongo.Db,
	BSON = mongo.BSONPure,
	ObjectID = mongo.ObjectID;

// Currently using MongoLab, but we can fall
// back on MongoHQ or hand-coded URI like so
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/user_manager_db';


////Older db.open way ////
//var server = new Server('localhost', 27017, {auto_reconnect: true});
//db = new Db('user_manager_db', server);



//////// Heroku mongolab stuff - conflicts with above /////
//var mongoUri = process.env.MONGOLAB_URI ||
//  process.env.MONGOHQ_URL ||
//  'mongodb://localhost/user_manager_db';

//mongo.Db.connect(mongoUri, function (err, db) {
//  db.collection('mydocs', function(er, collection) {
//    collection.insert({'mykey': 'myvalue'}, {safe: true}, function(er,rs) {
//    });
//  });
//});
///////////////////////////////////////////////////////////////

//db.open(function(err, db){
mongo.Db.connect(mongoUri, function (err, db) {
	if(!err) {
		console.log("Connected to 'user_manager_db' database");
		db.collection('users', {strict:true}, function(err, collection){
			if(err) {
				console.log("The 'users' collection does not exist, creating it");
				populateDB(db);
			}
		});
   } else {
   	console.log('Error connecting to database - ' + err);
   }
});

exports.findAll = function(req, res) {
	console.log("Retrieving user list.")
	mongo.Db.connect(mongoUri, function (err, db) {
		if(!err) {
			db.collection('users', function(err, collection){
				collection.find().toArray(function(err, items) {
					res.send(items);
				});
			});
	   } else {
	   	console.log('Error connecting to database - ' + err);
	   	res.send({'error':'Error connecting to user database'});
	   }
	});
}

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving user: ' + id);
    mongo.Db.connect(mongoUri, function (err, db) {
    	if(!err) {
			db.collection('users', function(err, collection) {
			  collection.findOne({'_id':new ObjectID(id)}, function(err, item) {
			      res.send(item);
			  });
			});
	   } else {
	   	console.log('Error connecting to database - ' + err);
	   	res.send({'error':'Error connecting to user database'});	   }
    });
};

exports.addUser = function(req, res) {
	var user = req.body;
	console.log("req.body: " + req.body);
	console.log("Adding user: " + JSON.stringify(user));
	mongo.Db.connect(mongoUri, function (err, db) {
		if(!err) {
			db.collection('users', function(err, collection) {
				collection.insert(user, {safe:true}, function(err, result){
					if (err) {
						console.log('Error updating user: ' + err);
						res.send({'error':'Error adding user'});
					} else {
						console.log('Success: ' + JSON.stringify(result[0]));
						res.send(result[0]);
					}
				});
			});
		} else {
	   	console.log('Error connecting to database - ' + err);
	   	res.send({'error':'Error connecting to user database'});
	   }
	});
}

exports.updateUser = function(req, res) {
	var id = req.params.id;
	var user = req.body;
	mongo.Db.connect(mongoUri, function (err, db) {
		if(!err) {
			db.collection('users', function(err, collection){
				collection.update({'_id':new ObjectID(id)}, user, {safe:true}, function(err, result){
					if(err) {
						console.log('Error updating user - ' + err);
						res.send({'error':'An error has occurred'});
					} else {
						console.log('' + result + ' document(s) updated');
						res.send(user);
					}
				});
			});
		} else {
	   	console.log('Error connecting to database - ' + err);
	   	res.send({'error':'Error connecting to user database'});
	   }
	});
}

exports.deleteUser = function(req, res) {
	var id = req.params.id;
	mongo.Db.connect(mongoUri, function (err, db) {
		if(!err) {
			db.collection('users', function(err, collection){
				collection.remove({'_id':new ObjectID(id)}, {safe:true}, function(err, result){
					if(err) {
						res.send({'error':'Error deleting item - ' + err});
					} else {
						console.log('' + result + ' document(s) deleted');
						res.send(req.body);
					}
				});
			});
		} else {
	   	console.log('Error connecting to database - ' + err);
	   	res.send({'error':'Error connecting to user database'});
	   }
	});
}

/*-------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function(db) {
 
    var users = [
    {
        firstname: "Stephen",
        lastname: "Jones",
        age: "29",
    },
    {
        firstname: "Jenny",
        lastname: "Hendrix",
        age: "22",
    },
    {
        firstname: "Robert",
        lastname: "Parker",
        age: "35",
    },
    {
        firstname: "Ellen",
        lastname: "Martinez",
        age: "52",
    }];
 
    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });
 
};