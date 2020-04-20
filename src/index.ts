export = function limit(size: Number, func?: Function) {
    let n = 0;
    const waitPool = [];
    const callMethod = async (that1: any, fn1: Function, props1: any[], resolve1: Function, reject1: Function) => {
        try {
            n++;
            resolve1(await fn1.call(that1, ...props1));
        } catch (err) {
            reject1(err);
        } finally {
            n--;
            if (waitPool.length > 0) {
                const { that, fn, props, resolve, reject } = waitPool.shift();

                callMethod(that, fn, props, resolve, reject);
            }
        }
    };

    return function l(...props: any[]) {
        let fn = func;

        if (!fn) {
            fn = props.shift();
            if (typeof fn !== 'function') throw new Error('please check usage.');
        }

        return new Promise((resolve, reject) => {
            if (n < size) {
                callMethod(this, fn, props, resolve, reject);
            } else {
                waitPool.push({ that: this, fn, props, resolve, reject });
            }
        });
    };
}
