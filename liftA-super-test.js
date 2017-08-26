a = require('./liftA-super');
request = require('superagent');

// build a request, given x
let areq = (x) => request
	.get(x)
	.set({ Accept: 'application/json'});
// generate x, given an error from the request
let error = (x) => { return { error: x } };
// generate x, given a response from the request
let response = (x) => { return { status: x.status,
	body: x.body } };

let superduper = a.super.superA(areq, error, response);
superduper.runA('https://jsonplaceholder.typicode.com/posts/2');
