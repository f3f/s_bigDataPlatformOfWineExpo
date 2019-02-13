var pools = {};
var blacklist = {
    "init": true,
    "dispose": true,
    "resize": true
};

/**
 * 模块池，所有已被初始化的页面模块实例均可在此对象池中找到。
 * 这么做其实是非常不好的设计，后续正式版本应由统一的控制器控制所有模块的联动，而不应该由模块自行与其他模块耦合交互逻辑。
 * @author Molay
 */
module.exports = {
    /**
     * 通过Id获取模块令牌，通过模块令牌可调用模块上的方法。
     * @param id
     * @returns {{}}
     */
    get: function (id) {
        return {
            /**
             * 调用模块上的方法，第一个参数为方法名，其余参数为给该方法的传参。
             */
            call: function () {
                var args = Array.prototype.concat.call(arguments);
                var functionName = args.shift()[0];

                if (typeof functionName !== "string" || !functionName) throw new Error("必须指定合法的方法名。");
                if (functionName.indexOf("_") == 0) throw new Error("私有方法不允许被调用。");
                if (blacklist[functionName]) throw new Error("保留方法" + functionName + "不允许外部调用。");

                var module = pools[id];
                if (module && typeof module[functionName] === "function")
                    return module[functionName].apply(module, args);

                throw new Error("方法" + functionName + "不存在。");
            }
        }
    },

    /**
     * 将模块放入模块池中。
     * @param id
     * @param module
     */
    put: function (id, module) {
        pools[id] = module;
    },

    /**
     * 从模块池中删除模块。
     * @param id
     */
    remove: function (id) {
        delete pools[id];
    }
};