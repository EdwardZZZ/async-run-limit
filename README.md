# async-run-limit

make async function run only limit size, the rest run by queue.

让异步代码同时只运行指定的数量，其余的按队列执行。

### Install
```bash
$ npm i -S async-run-limit
```

### Types
```js
declare function limit(size: number, func?: (...props: any[]) => any): (...props: any[]) => Promise<unknown>;
```

### Usage

```js
const limit = require('async-run-limit');

// async function demo
const fn = (str) => new Promise((resolve, reject) => {
    const time = Math.random() * 3e3;
    setTimeout(() => {
        if (time > 2e3) return reject(new Error(`time too long, ${str}, ${time}`));
        resolve(`${str},${time}`);
    }, time);
});
```

#### eg1
```js
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
```

#### eg2
```js
const r2 = limit(3);

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
```
## Queue
```ts
import * as limit from 'async-run-limit';

const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time));

const asyncEditFn = async ({ id, title }: { id: number, title: string }) => {
    await sleep(Math.random() * 3e3);
    console.log(`[Edit] id: ${id} 's title change to "${title}"`)
}

function Queue<T = any>(queueKey: T, container: Map<T, Function> = new Map()): Function {
    let result = container.get(queueKey);

    if (!result) {
        result = limit(1);

        container.set(queueKey, result);
    }

    return result;
}

const q = Queue(1);
q(asyncEditFn, { id: 1, title: 'abc', });
q(asyncEditFn, { id: 1, title: 'abcd', });
q(asyncEditFn, { id: 1, title: 'abcde', });
```
