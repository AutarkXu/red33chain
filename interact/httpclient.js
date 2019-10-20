'use strict'
let request = require('request');
let Promise = require('bluebird')
let default_post_headers = {
    'content-type': 'application/json;charset=utf-8',
}

let agentOptions = {
    keepAlive: true,
    maxSockets: 256,
    // 'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1)'
}

exports.get = function (url, options) {
    options = options || {};

    let httpOptions = {
        url: url,
        method: "get",
        timeout: options.timeout || 5000,
        headers: options.headers || default_post_headers,
        agentOptions: agentOptions,
        // proxy:"http://127.0.0.1:1087"
    }

    return new Promise((reslove, reject) => {
        request.get(httpOptions, (err, res, body) => {
            if (err) {
                reject(err);
            } else if (res.statusCode != 200) {
                console.log(`get返回码出错：${res.statusCode}`);
                console.log(`请求url:${url}`);
                reject(res.statusCode);
            } else {
                return reslove(res);
            }
        })
    })

}

exports.post = function (url, postData, options) {
    options = options || {};

    let httpOptions = {
        url: url,
        method: "post",
        body: typeof postData === 'string'?postData:JSON.stringify(postData),
        timeout: options.timeout || 3000,
        headers: options.headers || default_post_headers,
        agentOptions: agentOptions
    }

    return new Promise((reslove, reject) => {
        request(httpOptions, (err, res, body) => {
            if (err) {
                console.log(err);
                reject(err);
            } else if (res.statusCode != 200) {
                console.log(`"post返回码出错："${res.statusCode}`);
                console.log(`请求url:${url},body:${JSON.stringify(httpOptions)}`);
                console.log(`"错误信息："${body}\n`);
                reject(res.statusCode);
            } else {
                reslove(res);
            }
        })
    })


}
