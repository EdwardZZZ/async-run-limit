# async-run-limit

make async function run only limit size, the rest run by queue.
让异步代码同时只运行指定的数量，其余的按队列执行。

### install
```bash
$ npm i -S async-run-limit
```

### usage
```js
const once = require('async-run-limit');

const fn = (str) => new Promise((resolve, reject) => {
    const time = Math.random() * 3e3;
    setTimeout(() => {
        if (time > 2e3) return reject(new Error(`time too long, ${str}, ${time}`));
        resolve(`${str},${time}`);
    }, time);
});

const r = limit(fn, 3)

r('a').then(str => console.log(str)).catch(err => console.log(err.message));
r('b').then(str => console.log(str)).catch(err => console.log(err.message));
r('c').then(str => console.log(str)).catch(err => console.log(err.message));
r('d').then(str => console.log(str)).catch(err => console.log(err.message));
r('e').then(str => console.log(str)).catch(err => console.log(err.message));
r('f').then(str => console.log(str)).catch(err => console.log(err.message));
r('g').then(str => console.log(str)).catch(err => console.log(err.message));
r('h').then(str => console.log(str)).catch(err => console.log(err.message));
r('i').then(str => console.log(str)).catch(err => console.log(err.message));
```

