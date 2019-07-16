# Promise Timeout Wrapper
Simple timeout wrapper for your asynchronous functions
## Installation
```bash
$ npm install promise-timeout-wrapper
```
## Usage
### timeoutPromiseWrapper(promise, timeout, customErrorInstance)

Rejects a promise with a `TimeoutPromiseError` or custom error. Parameters:

 * `promise: Promise` - Promise function.
 * `timeout: number` - Number of milliseconds to reject promise.
 * `customErrorInstance` - Custom error instance.

## TimeoutPromiseError

Special error class with error message - `Timeout promise error`.

## Examples

```javascript
const timeoutPromiseWrapper = require('promise-timeout-wrapper');

const asyncFunction = makeSmth();
const TIMEOUT = 1000;
const asyncFunctionTimeout = timeoutPromiseWrapper(asyncFunction, TIMEOUT);

(async () => {
    await asyncFunctionTimeout();
})();
```
