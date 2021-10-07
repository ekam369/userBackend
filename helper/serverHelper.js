"use strict";

exports.normalizePort = (val) => {
    let port = parseInt(val);
    if(isNaN(port)) {
        return val;
    }
    if(port >= 0) {
        return port;
    }
    return false;
}