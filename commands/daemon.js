import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import debug from 'debug';
import http from 'http';
import cors from 'cors';
import { default as routes } from "../routes/index.js";

debug('tmanager:server');

let server;

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

export default function () {
    const app = express();

    routes(app);

    app.use(logger('dev'));
    app.use(cors());
    app.use(express.json());

    app.use(function (req, res, next) {
        next(createError(404));
    });

    app.use(function (err, req, res, next) {
        const  error = req.app.get('env') === 'development' ? err : { message: err.message };

        res.status(err.status || 500).json(error);
    });

    const port = normalizePort(process.env.PORT || '3000');

    app.set('port', port);

    server = http.createServer(app);

    server.on('error', onError);
    server.on('listening', onListening);

    return { server, port };
}
