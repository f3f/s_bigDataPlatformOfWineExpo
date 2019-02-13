var forge = require("./forge");
var EventDispatcher = require("./EventDispatcher");

/**
 * 页面模块基类.
 * @author Molay
 * @constructor
 */
var ModuleBase = function () {
    EventDispatcher.call(this);

    this.id = "module_"
        + Math.round(Math.random() * 0xFFFFFFFF) + "_"
        + Math.round(Math.random() * 0xFFFFFFFF);
};
ModuleBase.prototype = forge(EventDispatcher.prototype, {
    /**
     * 此模块的全局唯一标识符.
     */
    id: undefined,

    /**
     * 初始化状态标记.
     */
    initialized: false,

    /**
     * 模块模板.
     */
    template: "<h1>It works!</h1>",

    /**
     * 此模块的样式元素.
     */
    styleElements: undefined,
    /**
     * 此模块的根DOM元素.
     */
    rootElements: undefined,
    /**
     * 初始化.
     * @param {HTMLElement} mainDomElement 主容器节点,旗下保存了该模块模板中的内容.
     */
    init: function (mainDomElement) {
    },
    /**
     * 销毁此模块及其占用.
     */
    dispose: function () {
    },
    /**
     * 显示此模块内容.
     */
    show: function () {
    },
    /**
     * 隐藏此模块内容.
     */
    hide: function () {
    },
    /**
     * 更改尺寸.
     * @param {Number} scale 缩放系数.
     * @param {Number} width 当前窗体宽度.
     * @param {Number} height 当前窗体高度.
     */
    resize: function (scale, width, height) {
    }
});

module.exports = ModuleBase;