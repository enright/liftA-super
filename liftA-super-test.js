let arw = require('lifta')();
let superA = require('./liftA-super')(arw);
let request = require('superagent');

// build a request, given x
let areq = (x) => request
  .get(x)
  .set({
    Accept: 'application/json'
  });

let leftOnError = x => {
  if (x instanceof arw.Error) {
    return arw.Left(x);
  } else {
    return arw.Right(x);
  }
};

// will be x.first when fails
let fail = x => {
  console.log('ouchies an error:', x);
  return x;
};

// will be x.first when completes
let ok = x => {
  console.log('that went well:', x.body);
  return x;
};

let superduper = areq.liftA().thenA(superA)
  .thenA(leftOnError.liftA()).leftOrRightA(fail.liftA(), ok.liftA());

superduper.runA('https://jsonplaceholder.typicode.com/posts/2');
superduper.runA('https://jibber.jabber.blither/blather/2');