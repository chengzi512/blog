import 'whatwg-fetch'
const target = 'http://localhost:8001';
const Tool = {};

/**
 * 封装fetch post请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 */
Tool.post = (pathname,data)=>{
    // if(self.fetch)
    return fetch(target + pathname, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
    }).then((response) => response.json())
};
/**
 * 封装fetch get请求
 * @param {string} pathname 服务器请求地址
 * @param {object} data     发送给服务器的数据
 */
Tool.get = (pathname,data)=>{
    let aData = []; //存储数据
    let sData = ''; //拼接数据
    for (let attr in data) {
        aData.push(attr + '=' + Tool.filter(data[attr]));
    }
    sData = aData.join('&');

    return fetch(target + pathname + '?' + sData + '&' + new Date().getTime(), {
        method: "GET"
    }).then((response) => response.json())
};
/**
 * 特殊字符转义
 *
 * @param {str} t
 * @returns
 */
Tool.filter=(str)=> {
    str += ''; //隐式转换
    str = str.replace(/%/g, '%25');
    str = str.replace(/\+/g, '%2B');
    str = str.replace(/ /g, '%20');
    str = str.replace(/\//g, '%2F');
    str = str.replace(/\?/g, '%3F');
    str = str.replace(/&/g, '%26');
    str = str.replace(/\=/g, '%3D');
    str = str.replace(/#/g, '%23');
    return str;
};
/**
 * 格式化时间
 * 
 * @param {any} 时间字符串
 * @returns
 */
Tool.formatDate = function (str) {
    let date = new Date(str);
    let time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
        return '';
    } else if (time / 1000 < 60) {
        return '刚刚';
    } else if ((time / 60000) < 60) {
        return parseInt((time / 60000)) + '分钟前';
    } else if ((time / 3600000) < 24) {
        return parseInt(time / 3600000) + '小时前';
    } else if ((time / 86400000) < 31) {
        return parseInt(time / 86400000) + '天前';
    } else if ((time / 2592000000) < 12) {
        return parseInt(time / 2592000000) + '月前';
    } else {
        return parseInt(time / 31536000000) + '年前';
    }
};

/**
 * 本地数据存储或读取
 * 
 * @param {any} key
 * @param {any} value
 * @returns
 */
Tool.localItem = function (key, value) {
    if (arguments.length == 1) {
        return localStorage.getItem(key);
    } else {
        return localStorage.setItem(key, value);
    }
};

/**
 * 删除本地数据
 * 
 * @param {any} key
 * @returns
 */
Tool.removeLocalItem = function (key) {
    if (key) {
        return localStorage.removeItem(key);
    }
    return localStorage.removeItem();
};

/**
 * 获取浏览器名称
 *
 * @returns String
 */
Tool.getExplorer = function () {
    const explorer = window.navigator.userAgent;
    if (explorer.indexOf('MSIE') >= 0) {
        // ie
        return 'ie';
    } else if (explorer.indexOf('Firefox') >= 0) {
        // firefox
        return 'Firefox';
    } else if (explorer.indexOf('Chrome') >= 0) {
        // Chrome
        return 'Chrome';
    } else if (explorer.indexOf('Opera') >= 0) {
        // Opera
        return 'Opera';
    } else if (explorer.indexOf('Safari') >= 0) {
        // Safari
        return 'Safari';
    };
};

export {Tool};