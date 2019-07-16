// Copyright (c) 2019 kayrosik
'use strict';

/**
 * @class {TimeoutPromiseError} timeout promise error
 */
class TimeoutPromiseError extends Error {
    constructor() {
        super('Timeout promise error');
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 *
 * @param {Promise} asyncFunction
 * @param {number} timeout
 * @param {*} errorInstance
 * @return {function}
 */
module.exports = (asyncFunction, timeout = 1000, errorInstance = new TimeoutPromiseError()) => {
    return function() {
        return Promise.race([asyncFunction.call(this, ...arguments),
            new Promise((res, rej) => {
                setTimeout(rej.bind(this, errorInstance), timeout);
            }),
        ]);
    }
};
