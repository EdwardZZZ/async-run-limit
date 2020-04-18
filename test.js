const limit = require('./lib/index');

const fn = (str) => new Promise((resolve, reject) => {
    const time = Math.random() * 3e3;
    setTimeout(() => {
        if (time > 2e3) return reject(new Error(`time too long, ${str}, ${time}`));
        resolve(`${str},${time}`);
    }, time);
});

const r = limit(3, fn)

r('a').then(str => console.log(str)).catch(err => console.log(err.message));
r('b').then(str => console.log(str)).catch(err => console.log(err.message));
r('c').then(str => console.log(str)).catch(err => console.log(err.message));
r('d').then(str => console.log(str)).catch(err => console.log(err.message));
r('e').then(str => console.log(str)).catch(err => console.log(err.message));
r('f').then(str => console.log(str)).catch(err => console.log(err.message));
r('g').then(str => console.log(str)).catch(err => console.log(err.message));
r('h').then(str => console.log(str)).catch(err => console.log(err.message));
r('i').then(str => console.log(str)).catch(err => console.log(err.message));

const r2 = limit(3);

setTimeout(() => {
    r2(fn, '>>a').then(data => console.log(data)).catch(err => console.log(err.message));
    r2(fn, '>>b').then(data => console.log(data)).catch(err => console.log(err.message));
    r2(fn, '>>c').then(data => console.log(data)).catch(err => console.log(err.message));
    r2(fn, '>>d').then(data => console.log(data)).catch(err => console.log(err.message));
    r2(fn, '>>e').then(data => console.log(data)).catch(err => console.log(err.message));
    r2(fn, '>>f').then(data => console.log(data)).catch(err => console.log(err.message));
    r2(fn, '>>g').then(data => console.log(data)).catch(err => console.log(err.message));
    r2(fn, '>>h').then(data => console.log(data)).catch(err => console.log(err.message));
    r2(fn, '>>i').then(data => console.log(data)).catch(err => console.log(err.message));
    r2(fn, '>>j').then(data => console.log(data)).catch(err => console.log(err.message));
}, 5e3);