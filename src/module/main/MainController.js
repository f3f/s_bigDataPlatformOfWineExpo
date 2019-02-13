var forge = require("../core/forge");
var EventDispatcher = require("../core/EventDispatcher");
var ModulePool = require("./ModulePool");

var TEMPLATE_ROOT = "v-template-root";
var TEMPLATE_STYLE = "v-template-style";

/**
 * 主控制器逻辑-暂未完善,正在调整中.
 * @author Molay
 * @constructor
 */
var MainController = function () {
    EventDispatcher.call(this);

    this._moduleInstances = [];
    this._windowResizeHandler = this._windowResizeHandler.bind(this);
};
MainController.prototype = forge(EventDispatcher.prototype, {
    /**
     * 模块实例.
     */
    _moduleInstances: undefined,

    /**
     * 主容器元素.
     */
    _mainDomElement: undefined,

    /**
     * 主容器jQuery元素.
     */
    _$mainDomElement: undefined,

    /**
     * 初始化状态标记.
     */
    _initializedFlag: false,

    /**
     * 100%宽度。
     */
    _fullWidth: 1920,

    /**
     * 100%高度。
     */
    _fullHeight: 1080,
    
    /**
     * 是否开启调试模式，非调试模式时会隐藏一些影响到整体运行的错误细节（基于Try、Catch），
     * 调试模式将暴露出更多的问题细节，这些错误将会直接影响到整体运行，默认不开启调试模式。
     */
    _debugMode: false,
    
    setDebugMode: function (value) {
    	this._debugMode = value;
    	return this;
    },

    /**
     * 配置页面模块.
     * @param {Array} modules
     * @returns {MainController}
     */
    setModules: function (modules) {
        if (this._moduleInstances) {
            this._moduleInstances.forEach(function (moduleInstance) {
                moduleInstance.dispose();
            });
            this._moduleInstances = null;
        }

        if (modules instanceof Array && modules.length > 0) {
            this._moduleInstances = modules.map(function (module) {
                if (typeof module === "function") module = new module();
                if (typeof module.id !== "undefined") ModulePool.put(module.id, module);
                return module;
            });
        }
        return this;
    },

    /**
     * 配置主容器DOM元素.
     * @param {HTMLElement} domElement
     * @returns {MainController}
     */
    setMainDomElement: function (domElement) {
        if (!(domElement instanceof HTMLElement))
            throw new Error("Illegal HTMLElement.");
        this._mainDomElement = domElement;
        this._$mainDomElement = $(domElement);

        return this;
    },

    // 配置100%下的宽高。
    setFullSize: function (width, height) {
        this._fullWidth = width;
        this._fullHeight = height;

        return this;
    },

    /**
     * 初始化.
     * 应在window.onload后触发.
     * @returns {MainController}
     */
    init: function () {
        if (this._initializedFlag) return this;
        this._initializedFlag = true;

        var _this = this;
        if (_this._debugMode)
        	console.info("-- MainController DEBUG Enabled --");

        _this._moduleInstances.forEach(function (module) {
            if (module.initialized) return;

            var $template = $("<div></div>")
                .append(_this._normalizePath(module.template));
            var $header = $(document.head);
            var $main = _this._$mainDomElement;

            module.styleElements = [];
            $template.find("[" + TEMPLATE_STYLE + "]")
                .each(function (i, styleElement) {
                    styleElement.removeAttribute(TEMPLATE_STYLE);
                    module.styleElements.push(styleElement);
                    $header.append(styleElement);
                });

            module.rootElements = [];
            $template.find("[" + TEMPLATE_ROOT + "]")
                .children()
                .each(function (i, rootElement) {
                    module.rootElements.push(rootElement);
                    $main.append(rootElement);
                });
                
			if (_this._debugMode) {
				console.info("Module [" + module.id + "] start initialization.");
				module.init();
            	module.initialized = true;
            	console.info("Module [" + module.id + "] is initialized.");
			} else {
				try {
					module.init();
            		module.initialized = true;
				} catch (error) {
					console.error("Module [" + module.id + "] throws an exception:", error);
				}
			}
        });

        $(document.documentElement).css("font-size", "100px");
        $(document.body).css("font-size", "0.12rem");
            window.addEventListener("resize", _this._windowResizeHandler);
//       _this._windowResizeHandler(); 
       

        // _this._moduleInstances.forEach(function (module) {
        //     module.show();
        // });

        return this;
    },

    _normalizePath: function (html) {
        // var reg = "url";
        return html;
    },

    _windowResizeHandler: function () {
        var fullWidth = this._fullWidth;
        var fullHeight = this._fullHeight;

        var scale = window.innerWidth / window.innerHeight <= fullWidth / fullHeight
            ? window.innerWidth / fullWidth : window.innerHeight / fullHeight;
        // var offsetX = (window.innerWidth - fullWidth * scale) / 2;
        // var offsetY = (window.innerHeight - fullHeight * scale) / 2;

        $(document.documentElement).css("font-size", Math.round(100 * scale) + "px");

        this._moduleInstances.forEach(function (module) {
            if (module.initialized) module.resize(scale, window.innerWidth, window.innerHeight);
        });
    }
});

module.exports = MainController;