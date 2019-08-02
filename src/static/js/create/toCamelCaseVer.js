/**
 * 转换驼峰命名
 * @param variable  字符串  xxx_xxx_xxx
 * @param bigMark   大驼峰标记 true
 * @returns {void|string}
 * let www='xxx_xxx_xXXXx';
 console.log(toCamelCaseVer(www))
 xxxXxxXxx
 console.log(toCamelCaseVer(www,true))
 XxxXxxXxx
 */

export default function (variable, bigMark) {
    {
        let reg = /_+(\w)/g;
        variable = variable.toLowerCase();
        if (bigMark) {
            variable = variable.replace(/^./g, function () {
                if (arguments[2]) {
                    return (arguments[0]).toUpperCase();
                }
                return arguments[0];
            })
        }
        return variable.replace(reg, function () {
            if (arguments[2]) {
                return (arguments[1]).toUpperCase();
            }
            else {
                return arguments[0];
            }
        })
    }
}