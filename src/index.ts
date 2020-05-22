type TCallMethod = (that: any, fn: Function, props: any[], resolve: Function, reject: Function) => Promise<any>;

export = function limit(size: Number, func?: Function) {
    let n = 0;
    const waitPool: Parameters<TCallMethod>[] = [];
    const callMethod: TCallMethod = async (that, fn, props, resolve, reject) => {
        try {
            n++;
            resolve(await fn.call(that, ...props));
        } catch (err) {
            reject(err);
        } finally {
            n--;
            if (waitPool.length > 0) {
                callMethod(...waitPool.shift());
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
                waitPool.push([this, fn, props, resolve, reject]);
            }
        });
    };
}
