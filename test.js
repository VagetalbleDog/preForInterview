Function.prototype.bind_ = function (contenxt) {
    if (typeof this !== "function") {
        throw new Error(
            "Function.prototype.bind - what is trying to be bound is not callable"
        );
    }
    let fn = this;
    let args1 = [...arguments].splice(1);
    // 防止fn的原型被改变
    let fNOP = function () {};
    let bound = function () {
        let args2 = [...arguments];
        return fn.apply(this instanceof fn ? this : contenxt, [
            ...args1,
            ...args2,
        ]);
    };
    // 这里需要注意下
    fNOP.prototype = fn.prototype;
    bound.prototype = new fNOP();
    return bound;
};