// Copyright (c) 2019 kayrosik
'use strict';
const assert = require('assert');
const timeoutPromiseWrapper = require('../');

const promiseFunction = function (timeout, msg) {
  return new Promise(res => {
      setTimeout(res.bind(this, msg), timeout);
  });
};
const promiseFunctionTimeout = timeoutPromiseWrapper(promiseFunction, 500);
const promiseFunctionTimeoutWithCustomError = timeoutPromiseWrapper(promiseFunction, 500, new Error('Custom timeout error'));

describe('promise-timeout', function() {
    describe('promise-faster', function() {
        it('should resolve with expected promise value', () => {
            return promiseFunctionTimeout(100, 'OK').then(res => {
                assert.equal(res, 'OK');
            }, err => {
                assert.fail(err);
            });
        });
    });

    describe('promise-slower', () => {
        it('should reject with default error', async () => {
            try {
                await promiseFunctionTimeout(1000);
            } catch (err) {
                assert.equal(err.message, 'Timeout promise error');
                return;
            }
            throw new Error('should be rejected');
        });

        it('should reject with custom error', async () => {
            try {
                await promiseFunctionTimeoutWithCustomError(1000);
            } catch (err) {
                assert.equal(err.message, 'Custom timeout error');
                return;
            }
            throw new Error('should be rejected');
        });
    });
});