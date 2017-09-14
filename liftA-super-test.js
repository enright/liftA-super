a = require('./liftA-super');
request = require('superagent');

// build a request, given x
let areq = (x) => request
	.get(x.first())
	.set({ Accept: 'application/json'});

// will be x.first when fails
let fail = (err, res) => a.Error({ err: err, res: res});

// will be x.first when completes
let response = (res) => { return { status: res.status,
	body: res.body } };

let superduper = a.super.superA(areq, fail, response);

superduper.runA(['https://jsonplaceholder.typicode.com/posts/2', undefined]);
