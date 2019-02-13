/**
 * CommonJS模拟器入口,声明Node模块目录,并装载实际入口,模拟运行.
 * 需要注意的是,Node模块目录应可在Web中访问到.
 * 打包时应使用实际入口.
 * @author Molay
 */
// 声明Node模块目录,用以自动化查找公共库,如require("jquery")
exports.node_modules = __dirname + "/../node_modules";
// 引入真实的入口
require("./main.js");