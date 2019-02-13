/**
 * Created by jiaming on 2016/9/22.
 */

var EventDispatcher = require("../core/EventDispatcher");
var forge = require("../core/forge");

var scrollBar = function() {
    var me = this;
    EventDispatcher.call(me);
    me._changeHandler = me._changeHandler.bind(me);
};

scrollBar.prototype = forge(new EventDispatcher(), {
    scrollWidth: 10,
    scrollHeightBak: 0,
    offsetHeightBak: 0,
    maxTop: 0,
    mouseRange: 0,
    topScroll: 0,
    clientInit: 0,
    dom: null,
    scroll: null,
    list: null,
    init: function(d, h, s_w) {
        var me = this;

        if(s_w != null) {
            me.scrollWidth = s_w;
        }
        me.dom = d;
        $(me.dom).css({
            "-webkit-user-select": "none",
            "-moz-user-select": "none",
            "-khtml-user-select": "none",
            "user-select": "none",
            "-ms-user-select": "none",
            position: "absolute"
        });

        me.list = document.createElement('DIV');
        me.list.style.position = "absolute";
        me.list.style.overflow = "hidden";

        if(h != null) {
            $(me.list).css({
                "height": h + "px"
            });
        }
        me.dom.appendChild(me.list);

        me.scroll = document.createElement('DIV');
        $(me.scroll).css({
            cursor: "default",
            "width": me.scrollWidth + "px",
            "background-color": "rgba(111,112,112,0.4)",
            "-moz-border-radius": me.scrollWidth + "px",
            "-webkit-border-radius": me.scrollWidth + "px",
            "border-radius": me.scrollWidth + "px",
            "position": "absolute",
            "right": "0px",
            "top": "0px"
        });
        me.dom.appendChild(me.scroll);

        //添加事件
        me.addScrollEvent();

        return me.list;
    },
    resize: function(h) {
        var me = this;
        if(h == null) {
            $(me.list).css({
                "height": me.dom.offsetHeight + "px"
            });
        } else {
            $(me.list).css({
                "height": h + "px"
            });
        }
    },
    _changeHandler: function() {
        var me = this;
        me.fire({
            type: "change",
            "top": me.topScroll / me.list.offsetHeight * me.list.scrollHeight
        });
    },

    addEvent: function(e, scrollDom, callBack) {
        var me = this;
        var _dom = me;
        if(scrollDom != null) {
            _dom = scrollDom;
        }
        var e = window.event || e;
        var deltaY = e.wheelDeltaY / -1 ||
            (e.wheelDeltaY === undefined && e.wheelDelta / -1) ||
            (e.wheelDelta === undefined && e.detail * 40) ||
            0;
        if(deltaY == null) {
            return;
        }
        var _scrollTop = _dom.scrollTop + deltaY;

        if(_scrollTop < 0) {
            _scrollTop = 0;
        }
        _dom.scrollTop = _scrollTop;

        if(typeof callBack !== undefined) {
            callBack(_dom.scrollTop)
        }
        if(e && e.stopPropagation) {  
            e.stopPropagation(); 
        } 
        else {  
            window.event.cancelBubble = true; 
        }
    },
    /*
     * DOM上添加事件，实现滚轮滚动
     */
    addMousewheelEvent: function(fatherDom, scrollDom, callBack) {
        var me = this;
        fatherDom.addEventListener("DOMMouseScroll", function(e) {
            me.addEvent(e, scrollDom, callBack);
        });
        fatherDom.addEventListener("mousewheel", function(e) {
            me.addEvent(e, scrollDom, callBack);
        });
    },

    setScrollTop: function(top) {
        var me = this;

        $(me.list).css({
            "top": top + "px"
        });
        me.topScroll = top / me.list.scrollHeight * me.list.offsetHeight;
        $(me.scroll).css({
            "top": me.topScroll + "px"
        });
        me._changeHandler();
    },

    changeScrollPath: function() {
        var me = this;
        var s = $(me.scroll);
        if(me.list.scrollHeight != null &&
            me.list.offsetHeight != null &&
            me.list.scrollHeight != me.list.offsetHeight) {

            if(me.offsetHeightBak != me.list.offsetHeight || me.scrollHeightBak != me.list.scrollHeight) {

                me.topScroll = me.list.scrollTop / me.list.scrollHeight * me.list.offsetHeight;
            }
            s.css({
                "height": me.list.offsetHeight * (me.list.offsetHeight / me.list.scrollHeight) + "px",
                "top": me.topScroll + "px"
            });
            if(s.is(":hidden")) {
                s.fadeIn(100);
            }
            me.maxTop = me.list.offsetHeight - me.list.offsetHeight * (me.list.offsetHeight / me.list.scrollHeight);

            me.offsetHeightBak = me.list.offsetHeight;
            me.scrollHeightBak = me.list.scrollHeight
        } else if(me.list.scrollHeight != null &&
            me.list.offsetHeight != null &&
            me.list.scrollHeight == me.list.offsetHeight) {
            if(!s.is(":hidden")) {
                s.fadeOut(100);
            }
        }

    },

    addScrollEvent: function() {
        var me = this;
        var s = $(me.scroll);
        me.dom.addEventListener("mouseover", function(e) {
            me.changeScrollPath();
        });
        me.dom.addEventListener("mouseleave", function(e) {
            if(s.is(":hidden") == false) {
                s.fadeOut(100);
            }
        });
        me.addMousewheelEvent(me.dom, me.list, function(top) {
            if(me.list.scrollHeight != null &&
                me.list.scrollHeight != null &&
                me.list.scrollHeight != me.list.offsetHeight) {
                me.topScroll = top / me.list.scrollHeight * me.list.offsetHeight;
                s.css({
                    "top": me.topScroll + "px"
                });

                me._changeHandler();
            }
        });
        me.scroll.addEventListener("mouseover", function(e) {
            s.css({
                "background-color": "rgba(111,112,112,0.7)"
            });
        });
        me.scroll.addEventListener("mouseout", function(e) {
            s.css({
                "background-color": "rgba(111,112,112,0.4)"
            });
        });
        me.scroll.addEventListener("mousedown", function(e) {
            me.onMouseDown(e);
        });
    },

    onMouseDown: function(e) {
        var me = this;
        var event = e || window.event;

        me.clientInit = event.clientY;

        window.viewDocumentMousemove = me;
        if(e && e.stopPropagation) {  
            e.stopPropagation(); 
        } 
        else {  
            window.event.cancelBubble = true; 
        }
    },

    setMoveAction: function(e) {
        var me = this;

        me.clientChange = e.clientY;

        me.mouseRange = e.clientY - me.clientInit;

        var top = me.topScroll + me.mouseRange;
        if(top < 0) {
            top = 0;
        } else if(top > me.maxTop) {
            top = me.maxTop;
        }

        me.list.scrollTop = top / me.list.offsetHeight * me.list.scrollHeight;
        $(me.scroll).css({
            "top": top + "px"
        });
    },
    setMouseUp: function(e) {
        var me = this;

        me.topScroll = me.topScroll + me.mouseRange;
        if(me.topScroll < 0) {
            me.topScroll = 0;
        } else if(me.topScroll > me.maxTop) {
            me.topScroll = me.maxTop;
        }
    }
});
module.exports = scrollBar;