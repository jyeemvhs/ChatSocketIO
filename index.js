#!/usr/bin/env node

/**
 * Module dependencies.
 */
let express = require('express');
var bodyParser = require('body-parser');
var routes = require("./routes");

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

var http = require('http');

/**
 * Get port from environment and store in Express.
 */
//let port = process.env.PORT || 3000;
//app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

////////////////////////////////
// Socket.io server listens to our app
var io = require('socket.io').listen(server);

// Emit welcome message on connection
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });

    socket.on('update', function (data) {
        // Broadcast to everyone (including self)
        console.log(data.handle + " " + data.update);
        io.emit('update', data);
    });

});
////////////////////////////////////


/**
 * Listen on provided port, on all network interfaces.
 */
let port = process.env.PORT || 3000;

server.listen(port);
