function multiRequest(tasks, maxNum) {
    const len = tasks.length;

    // 创建新数组用于存放请求的返回结果
    const result = new Array(len).fill(false);

    // 请求执行次数
    let count = 0;
    return new Promise((resolve, reject) => {

        // 当小于最大并发数时，执行请求
        while(count < maxNum) {
            run();
        }
        function run() {
            let cur = count++;
            tasks[cur]().then(res => {
                result[cur] = res;
            }).catch(err => {
                result[cur] = err;
            }).finally(() => {

                // 某个请求结果返回后，判断是否需要执行新的请求
                if(count < tasks.length) {
                    run();
                } else if (!result.includes(false)) {

                    // 所有的请求执行完成
                    resolve(result);
                }
            })
        }
    });
}