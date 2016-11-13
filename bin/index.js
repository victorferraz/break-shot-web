var app = require('../app');
var debug = require('debug')('break-shot-web:server');
var http = require('http');
var controller = require('../core/controller');
var port = normalizePort(process.env.PORT || '4000');
app.set('port', port);
var server = http.createServer(app);
var io = require('socket.io')(server);

server.listen(port, function () {
   console.log('running');
});

server.on('error', onError);
server.on('listening', onListening);

var sockets = [];
var messages = [];

io.sockets.on('connection', function (socket) {
    socket.emit('messages-available', messages);
    socket.on('add-message', function (data) {
        controller.go(data, function(data){
            io.sockets.emit('message-added', data);
        });
    });
});

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

    switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
    default:
        throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
