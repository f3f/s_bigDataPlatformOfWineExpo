var Timer = require("./Timer");

/**
 * 布局划分为三个阶段:提交,测量与布局.
 * Tick-Tock模型基于延迟原理,每次设置属性(Setter)时,并不立刻执行更新(如视图重绘等),而是标记此组件需要更新,
 * 在下一个时刻统一将所有属性变化进行一次更新,从而达到高性能的目的.
 * 以下是布局管理器实现.
 */
function LayoutManager() {
    Object.call(this);

    this._timerCompleteHandler = this._timerCompleteHandler.bind(this);

    this._timer = new Timer(Timer.REQUEST_ANIMATION_FRAME, 1);
    this._timer.on("timerComplete", this._timerCompleteHandler, this);
}
LayoutManager.prototype = {
    constructor: LayoutManager,

    _initialized: false,
    _timer: null,
    _invalidatePropertiesQueue: [],
    _invalidatePropertiesFlag: false,
    _invalidateSizeQueue: [],
    _invalidateSizeFlag: false,
    _invalidateDisplayListQueue: [],
    _invalidateDisplayListFlag: false,

    _timerCompleteHandler: function (event) {
        if (this._invalidatePropertiesFlag)
            this._validateProperties();
        if (this._invalidateSizeFlag)
            this._validateSize();
        if (this._invalidateDisplayListFlag)
            this._validateDisplayList();
    },

    invalidateProperties: function (client) {
        if (client && typeof client.validateProperties === "function") {
            this._invalidatePropertiesQueue.push(client);
            this._invalidatePropertiesFlag = true;
            if (!this._timer.running()) this._timer.start();
        }
    },
    invalidateSize: function (client) {
        if (client && typeof client.validateSize === "function") {
            this._invalidateSizeQueue.push(client);
            this._invalidateSizeFlag = true;
            if (!this._timer.running()) this._timer.start();
        }
    },
    invalidateDisplayList: function (client) {
        if (client && typeof client.validateDisplayList === "function") {
            this._invalidateDisplayListQueue.push(client);
            this._invalidateDisplayListFlag = true;
            if (!this._timer.running()) this._timer.start();
        }
    },
    validateClient: function (client) {
        if (!client) throw new Error("Target is NULL.");
        if (typeof client.validateProperties === "function")
            client.validateProperties();
        if (typeof client.validateSize === "function")
            client.validateSize();
        if (typeof client.validateDisplayList === "function")
            client.validateDisplayList();
    },

    _validateProperties: function () {
        while (this._invalidatePropertiesQueue.length > 0) {
            var client = this._invalidatePropertiesQueue.pop();
            client.validateProperties();
        }
        this._invalidatePropertiesFlag = false;
    },
    _validateSize: function () {
        while (this._invalidateSizeQueue.length > 0) {
            var client = this._invalidateSizeQueue.pop();
            client.validateSize();
        }
        this._invalidateSizeFlag = false;
    },
    _validateDisplayList: function () {
        while (this._invalidateDisplayListQueue.length > 0) {
            var client = this._invalidateDisplayListQueue.pop();
            client.validateDisplayList();
        }
        this._invalidateDisplayListFlag = false;
    }
};
var _instance = new LayoutManager();
LayoutManager.getInstance = function () {
    return _instance;
};

module.exports = LayoutManager;