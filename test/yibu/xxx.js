const timeOut = function (num) {
    return new Promise(function (resolve, reject) {
        // 进行异步操作
        setTimeout(()=>{
            resolve(num)
        },3000)
    });
};

const asyncF = async function (num) {
    const f1 = await timeOut(1);
    // 过三秒先打印1
    console.log(f1);
    const f2 = await timeOut(num);
    // 再过三秒打印2
    console.log(3);
    // 返回2
    return f2
};

asyncF(2).then((res)=>{
    console.log(res)
})