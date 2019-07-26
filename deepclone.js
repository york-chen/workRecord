function  deepClone(data) {
      const type = this.judgeType(data);
      let obj;
      if (type === 'array') {
        obj = [];
      } else if (type === 'object') {
        obj = {};
      } else {
    // 不再具有下一层次
        return data;
      }
      if (type === 'array') {
        // eslint-disable-next-line
        for (let i = 0, len = data.length; i < len; i++) {
          obj.push(this.deepClone(data[i]));
        }
      } else if (type === 'object') {
        // 对原型上的方法也拷贝了....
        // eslint-disable-next-line
        for (const key in data) {
          obj[key] = this.deepClone(data[key]);
        }
      }
      return obj;
    },


function  judgeType(obj) {
  // tostring会返回对应不同的标签的构造函数
      const toString = Object.prototype.toString;
      const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
      };
      if (obj instanceof Element) {
        return 'element';
      }
      return map[toString.call(obj)];
    }
