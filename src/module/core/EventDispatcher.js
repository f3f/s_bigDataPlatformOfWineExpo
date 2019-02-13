/**
 * 事件派发器,实现基础的事件监听与派发模型.
 * @author Molay
 * @param {EventDispatcher} [target] 此事件派发器的目标,为空则派发事件上的target均指向派发器本身.
 * 若不为空(必须为事件派发器实例)则派发事件上的target指向指定的对象.
 * @constructor
 */
function EventDispatcher(target) {
    if (target && !(target instanceof EventDispatcher)) throw new Error("Illegal target.");
    this._target = target;
}
EventDispatcher.prototype = {
    constructor: EventDispatcher,

    _target: null,

    /**
     * 在此事件派发器上添加事件监听.
     * @param {string} type 事件类型.
     * @param {Function} listener 事件监听器.
     * @param {Object} [thisArg] 事件监听器的this指针(可选).
     */
    addEventListener: function (type, listener, thisArg) {
        var me = this;

        if (!type || typeof listener !== "function")
            throw new Error("Illegal parameters.");

        if (me._mapKTypeVListenerTokens === undefined)
            me._mapKTypeVListenerTokens = {};

        var listenerTokens = me._mapKTypeVListenerTokens[type];
        if (listenerTokens === undefined) {
            listenerTokens = [];
            me._mapKTypeVListenerTokens[type] = listenerTokens;
        }

        var token = {
            listener: listener,
            thisArg: thisArg
        };
        listenerTokens.push(token);
    },
    /**
     * 从此事件派发器上删除指定事件监听.
     * @param {string} type 事件类型.
     * @param {Function} listener 事件监听器.
     */
    removeEventListener: function (type, listener) {
        var me = this;

        if (!type || typeof listener !== "function")
            throw new Error("Illegal parameters.");

        if (me._mapKTypeVListenerTokens === undefined)
            return;

        var listenerTokens = me._mapKTypeVListenerTokens[type];
        if (listenerTokens === undefined) return;

        var position = -1;
        var token = null;
        for (var index = 0; index < listenerTokens.length; index++) {
            token = listenerTokens[index];
            if (token.listener === listener) {
                position = index;
                break;
            }
        }

        if (position !== -1) {
            listenerTokens.splice(position, 1);
            delete token.listener;
            delete token.thisArg;
        }
        if (listenerTokens.length < 1)
            delete me._mapKTypeVListenerTokens[type];
    },
    /**
     * 从此事件派发器上删除事件监听,如果不提供事件类型,则删除全部事件监听.
     * @param {string} type 事件类型.
     */
    removeEventListeners: function (type) {
        var me = this;

        if (me._mapKTypeVListenerTokens === undefined)
            return;

        if (type === undefined) {
            for (var key in me._mapKTypeVListenerTokens) {
                if (me._mapKTypeVListenerTokens.hasOwnProperty(key))
                    me.removeEventListeners(key);
            }
        } else {
            var listenerTokens = me._mapKTypeVListenerTokens[type];
            if (listenerTokens === undefined) return;

            for (var index = 0; index < listenerTokens.length; index++) {
                var token = listenerTokens[index];
                delete token.listener;
                delete token.thisArg;
            }
            delete me._mapKTypeVListenerTokens[type];
        }
    },
    /**
     * 检查此事件派发器上是否存在事件监听,如果不传递事件监听器,则判断是否存在指定事件类型的事件监听.
     * @param {string} type 事件类型
     * @param {Function} [listener] 事件监听器(可选).
     * @returns {boolean} 是否存在指定类型及指定事件监听器的事件监听.
     */
    hasEventListener: function (type, listener) {
        var me = this;

        if (!type)
            throw new Error("Illegal parameters.");

        if (me._mapKTypeVListenerTokens === undefined)
            return false;

        var listenerTokens = me._mapKTypeVListenerTokens[type];

        if (listener === undefined)
            return listenerTokens !== undefined;

        for (var index = 0; index < listenerTokens.length; index++) {
            var token = listenerTokens[index];
            if (token.listener === listener) return true;
        }

        return false;
    },
    /**
     * 在此事件派发器上派发事件.
     * @param {Object} event 待派发的事件.
     */
    dispatchEvent: function (event) {
        var me = this;

        if (!event || !event.type)
            throw new Error("Illegal parameter event: " + event);

        if (event instanceof Event) {
            console.warn("It recommends to use Object instead of Event class.");
            var o = {};
            for (var i in event) if (!(event[i] instanceof Function)) o[i] = event[i];
            event = o;
        }

        if (me._mapKTypeVListenerTokens === undefined) {
            //console.log("It hadn't register any listeners yet.");
            return;
        }

        var listenerTokens = me._mapKTypeVListenerTokens[event.type];
        if (listenerTokens === undefined) {
            //console.log("It hadn't register any listeners for type: " + event.type);
            return;
        }

        var target = this._target || me;
        event.target = target;

        for (var index = 0; index < listenerTokens.length; index++) {
            var token = listenerTokens[index];
            token.listener.call(token.thisArg, event);
        }
    },
    /*
     * 语法糖.
     * on == addEventListener
     * off == removeEventListeners
     * fire == dispatchEvent
     */
    on: function (type, listener, thisArg) {
        this.addEventListener(type, listener, thisArg);
    },
    off: function (type) {
        this.removeEventListeners(type);
    },
    fire: function (event) {
        this.dispatchEvent(event);
    }
};

module.exports = EventDispatcher;