/*
MIT License

Copyright (c) 2017 Bill Enright

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

let a = require('liftA')();

// buildRequest creates a request from x
// if an error or !res.ok occurs, we continue with x.first(error(err, res))
// for responses (which may be any result code)
// we continue with x.first(response(res))
let superA = (buildRequest, error, response) => (x, cont, p) => {
	let aRequest = buildRequest(x);
	aRequest.end(function (err, res) {
		if (err || !res.ok) {
			cont([x.first(error(err, res)), x.second()], p);
		} else {
			cont([x.first(response(res)), x.second()], p);
		}
	});
	return p.add(() => aRequest.abort());
}

a.super = { superA: superA }
module.exports = a;
