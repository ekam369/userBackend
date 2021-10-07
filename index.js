const http = require('http');
const config = require('config');
const app = require('./app');
const { normalizePort } = require('./helper/serverHelper');

const mode = process.env.NODE_ENV || config.get('APPLICATION.NODE_ENV');
const port = normalizePort(process.env.PORT || config.get('APPLICATION.PORT'));

global.authToken = "";
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`${mode} is running on port ${port}`);
});
server.on('listening ', onListening);
server.on('error ', onError);

function onListening() {
    let address = server.address === 'string' ?
        'pipe ' + address :
        'port ' + address.port;
    console.log(`Listening on ${bind}`); 
}

function onError(error) {
    if(error.syscall !== 'listen') {
        throw error;
    }
    let bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;
        
    switch (error.code) {
        case 'EACCESS': 
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
        default:
            throw error;
    }
}