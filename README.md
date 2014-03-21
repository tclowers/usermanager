UserManager
===========

This is a very simple Node.js/Express.js user database API that employs MongoDB for persistence. 
It's a good example of a basic REST api that uses the four basic HTTP actions (GET, POST, PUT, DELETE)
to handle CRUD operations.

OUTPUT
======
All output is in JSON (ideally you'd put a Backbone/Angular front-end on this),


INPUT
=====
All POST and PUT form data should be in 'Content-type: application/json'


INSTALLATION
============
just run
```
$ npm install
```
to install the dependencies and you should be good to go. Works on localhost.
If you're installing on Heroku, you also have add MongoLab or MongoHQ to run.
