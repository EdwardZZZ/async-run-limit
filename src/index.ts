export = function limit(fn: Function, size: Number) {
    let n = 0;
    const waitPool = [];
    const callMethod = async (props1: any[], resolve1: Function, reject1: Function) => {
        try {
            const data = await fn(...props1);

            resolve1(data);
        } catch (err) {
            reject1(err);
        } finally {
            n--;
            if (waitPool.length > 0) {
                const { props, resolve, reject } = waitPool.shift();

                n++;
                callMethod.call(this, props, resolve, reject);
            }
        }
    };

    return function l(...props: any[]) {
        return new Promise((resolve, reject) => {
            if (n < size) {
                n++;
                callMethod.call(this, props, resolve, reject);
            } else {
                waitPool.push({ props, resolve, reject });
            }
        });
    };
}
