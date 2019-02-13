var forge = require("./forge");
var EventDispatcher = require("./EventDispatcher");
var LayoutManager = require("./LayoutManager");

/**
 * UI组件基类,定义基础的组件Tick-tock模型与方法,所有可视化组件均应继承自此基类.
 * @author Molay
 */
function UiComponent() {
    EventDispatcher.call(this);
}
UiComponent.prototype = forge(EventDispatcher.prototype, {
    constructor: UiComponent,

    _invalidatePropertiesFlag: false,
    _invalidateSizeFlag: false,
    _invalidateDisplayListFlag: false,

    _x: 0,
    x: function (value) {
        if (arguments.length == 0) return this._x;
        if (this._x == value) return;
        this._x = value;
        this.invalidateProperties();
        this.invalidateSize();
        this.invalidateDisplayList();
    },

    _y: 0,
    y: function (value) {
        if (arguments.length == 0) return this._y;
        if (this._y == value) return;
        this._y = value;
        this.invalidateProperties();
        this.invalidateSize();
        this.invalidateDisplayList();
    },

    _width: 100,
    width: function (value) {
        if (arguments.length == 0) return this._width;
        if (this._width == value) return;
        this._width = value;
        this.invalidateProperties();
        this.invalidateSize();
        this.invalidateDisplayList();
    },

    _height: 100,
    height: function (value) {
        if (arguments.length == 0) return this._height;
        if (this._height == value) return;
        this._height = value;
        this.invalidateProperties();
        this.invalidateSize();
        this.invalidateDisplayList();
    },

    initialize: function () {
    },

    invalidateProperties: function () {
        if (this._invalidatePropertiesFlag) return;
        this._invalidatePropertiesFlag = true;
        LayoutManager.getInstance().invalidateProperties(this);
    },
    invalidateSize: function () {
        if (this._invalidateSizeFlag) return;
        this._invalidateSizeFlag = true;
        LayoutManager.getInstance().invalidateSize(this);
    },
    invalidateDisplayList: function () {
        if (this._invalidateDisplayListFlag) return;
        this._invalidateDisplayListFlag = true;
        LayoutManager.getInstance().invalidateDisplayList(this);
    },
    validateNow: function () {
        LayoutManager.getInstance().validateClient(this);
    },
    validateProperties: function () {
        if (this._invalidatePropertiesFlag) {
            this.commitProperties();
            this._invalidatePropertiesFlag = false;
        }
    },

    validateSize: function () {
        if (this._invalidateSizeFlag) {
            this.measure();
            this._invalidateSizeFlag = false;
        }
    },
    validateDisplayList: function () {
        if (this._invalidateDisplayListFlag) {
            this.updateDisplayList();
            this._invalidateDisplayListFlag = false;
        }
    },

    commitProperties: function () {
    },

    measure: function () {
    },

    updateDisplayList: function () {
    },

    setStyle: function () {
    }
});

module.exports = UiComponent;