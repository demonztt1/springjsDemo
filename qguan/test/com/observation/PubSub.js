/**
 * 发布订阅模式(观察者模式)
 * handles: 事件处理函数集合
 * on: 订阅事件
 * emit: 发布事件
 * off: 删除事件
 **/

class PubSub {
    constructor() {
        this.handles = {};
    }

    // 订阅事件
    on(eventType, handle) {
        if (!this.handles.hasOwnProperty(eventType)) {
            this.handles[eventType] = [];
        }
        if (typeof handle == 'function') {
            this.handles[eventType].push(handle);
        } else {
            throw new Error('缺少回调函数');
        }
        return this;
    }

    // 发布事件
    emit(eventType, ...args) {
        if (this.handles.hasOwnProperty(eventType)) {
            this.handles[eventType].forEach((item, key, arr) => {
                item.apply(null, args);
            })
        } else {
            throw new Error(`"${eventType}"事件未注册`);
        }
        return this;
    }

    // 删除事件
    off(eventType, handle) {
        if (!this.handles.hasOwnProperty(eventType)) {
            throw new Error(`"${eventType}"事件未注册`);
        } else if (typeof handle != 'function') {
            throw new Error('缺少回调函数');
        } else {
            this.handles[eventType].forEach((item, key, arr) => {
                if (item == handle) {
                    arr.splice(key, 1);
                }
            })
        }
        return this; // 实现链式操作
    }
}

// 下面做一些骚操作
let callback = function () {
    console.log('you are so nice');
}

let pubsub = new PubSub();
pubsub.on('completed', (...args) => {
    console.log(args.join(' '));
}).on('completed', callback);

/*
pubsub.off('completed', callback);
pubsub.emit('completed', 'fucking', 'again');*/
let pubsubs = new PubSub();


pubsub.emit('completed', 'what', 'a', 'fucking day');


class SS{
    constructor(){
        pubsubs.on('completed', this.emit.bind(this));
        this.xxx='ssss'
    }
    emit(...args){
        console.log("SS    emit         "+args.join(' ')+ this.xxx);
    }
}

var  ss =new SS()
pubsubs.emit('completed', 'what', 'a', 'fucking day');