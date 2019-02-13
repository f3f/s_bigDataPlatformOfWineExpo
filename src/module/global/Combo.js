/*
 * combo box
 * jia ming
 *
 * 使用方法：
 *  var combo = require("../combobox/Combo.js");
 *  option = {};
 *  combo的宽与高（可选参数）：
 *      option.width = 180;
 *      option.height = 40;
 *
 *  列表list：
 *      option.list = ["全国", "北京","上海", "广州","深圳", "重庆"];
 *
 *  设置被选择的item：
 *      option.selectedIndex = 0;
 *
 *  combo box变更回调函数：
 *      option.onchange = function(text, i){
 *          console.log(text, i);
 *      }
 *
 *  创建dom实例：
 *      var c = comboClass(combox, option);
 *  实例创建之后，
 *      可以被选择项目变更：
 *          c.setSelectedIndex(3);
 *      可以进行数据列表变更：
 *          c.setData(["全国1", "北京2","上海3"]);
 *      可以替换回调函数：
 *          c.setChangeFn(function(){ console.log(1)});
 *
 *  备注：
 *      属性defaultValue是给非列表内项目作为默认值使用的。
 */
var scrollClass = require("./ScrollBar.js");

window.menuMangerElement = null;

window.addEventListener("click", function() {
    if(menuMangerElement != null) {
        $(menuMangerElement).hide();
        menuMangerElement = null;
    }
});

module.exports = function(dom, option) {
    var width = 180;
    var height = 40;
    var itemHeight = 45;
    var defaultValue = "";
    var list = [];
    var selectedIndex = -1;
    var listItemEl = [];
    var changeEventFn = function() {};

    var backgroundImage = null;
    var backgroundColor = "transparent";
    var backgroundHoverColor = backgroundColor;
    var textFontColor = "#38aeff";
    var textFontHoverColor = "#FFFFFF";
    var paddingLeft = 10;
    var fontSize = 14;
    var lineColor = "transparent";
    var menuBackgroundColor = "#FFFFFF";
    var menuBackgroundHoverColor = "#eb4b4f";
    var menuTextFontColor = "#6d6e78";
    var menuTextFontHoverColor = "#FFFFFF";
    var menuPositionY = 0;
    var menuPositionX = 0;
    var menuWidhtPositionX = 0;
    var valueBackgroundColor = "transparent";
    var borderWidth = 0;
    var borderColor = "transparent";
    var menuBorderWidth = 0;
    var menuBorderColor = "transparent";
    var imageWidth = 0;
    var imageHeight = 0;
    var imageSrc = null;
    var imageHoverSrc = null;

    var domEl, mainEl, valueEl, listEl, text, buttonEl;

    var scrollModule = new scrollClass();

    var showShareElement = function() {
        if(window.menuMangerElement != null && listEl != window.menuMangerElement) {
            $(window.menuMangerElement).hide();
        }
        window.menuMangerElement = listEl;
    }

    var createValueDom = function() {
        valueEl = document.createElement("div");
        valueEl.className = "break-line";
        valueEl.style.backgroundColor = valueBackgroundColor;
        valueEl.style.width = (width - height) + "px";
        valueEl.style.height = (height - borderWidth * 2) + "px";

        text = document.createElement("span");
        text.style.overflow = "hidden";
        text.style.whiteSpace = "nowrap";
        text.style.textOverflow = "ellipsis";
        text.style.lineHeight = (height - borderWidth * 2) + "px";
        if(selectedIndex == -1) {
            text.innerText = defaultValue;
        } else if(list.length - 1 >= selectedIndex) {
            text.innerText = list[selectedIndex];
        }

        text.style.color = textFontColor;
        text.style.paddingLeft = paddingLeft + "px";

        valueEl.appendChild(text);
        mainEl.appendChild(valueEl);

    }

    var createMainStyle = function() {
        mainEl = document.createElement("div");

        mainEl.style.borderStyle = "solid";
        mainEl.style.cursor = "pointer";
        mainEl.style.zIndex = 2;
        mainEl.style.backgroundColor = "transparent";

        mainEl.style.borderWidth = borderWidth + "px";
        mainEl.style.borderColor = borderColor;

        mainEl.style.width = (width - borderWidth * 2) + "px";
        mainEl.style.height = (height - borderWidth * 2) + "px";
        mainEl.style.position = "absolute";
        mainEl.style.backgroundColor = backgroundColor;
        mainEl.style.fontSize = fontSize + "px";

        if(backgroundImage != null) {
            mainEl.style.backgroundImage = backgroundImage;
            mainEl.style.backgroundRepeat = "no-repeat";
        }
        mainEl.addEventListener("mouseover", function() {
            text.style.color = textFontHoverColor;
            mainEl.style.backgroundColor = backgroundHoverColor;

            if(imageHoverSrc != null) {
                buttonEl.style.backgroundImage = imageHoverSrc;
            }
        });
        mainEl.addEventListener("mouseout", function() {
            text.style.color = textFontColor;
            mainEl.style.backgroundColor = backgroundColor;

            if(imageSrc != null) {
                buttonEl.style.backgroundImage = imageSrc;
            }
        });

        mainEl.addEventListener("click", function(e) {
            if(listEl != null) {
                if($(listEl).is(":hidden")) {
                    $(listEl).show();
                    showShareElement();
                } else {
                    $(listEl).hide();
                    window.menuMangerElement = null;
                }
            } else {
                listEl = document.createElement("div");
                listEl.style.border = "none";
                listEl.style.zIndex = 40;
                listEl.style.webkitUserSelect = "none";
                listEl.style.mozUserSelect = "none";
                listEl.style.khtmlUserSelect = "none";
                listEl.style.userSelect = "none";
                listEl.style.msUserSelect = "none";
                listEl.style.cursor = "pointer";

                listEl.style.position = "absolute";
                listEl.style.left = menuPositionX + "px";
                listEl.style.top = (height - menuPositionY) + "px";
                listEl.style.width = (width - menuPositionX - menuWidhtPositionX - menuBorderWidth * 2) + "px";
                listEl.style.backgroundColor = menuBackgroundColor;
                listEl.style.borderWidth = menuBorderWidth + "px";
                listEl.style.borderColor = menuBorderColor;
                listEl.style.borderStyle = "solid";
                listEl.style.borderTopWidth = "0px";

                var _itemsEl = null;
                if(list.length > 6) {
                    listEl.style.height = (6 * itemHeight) + "px";
                    _itemsEl = scrollModule.init(listEl, 6 * itemHeight, 5);

                    _itemsEl.style.display = "inline-block";
                    _itemsEl.style.width = "100%";
                    _itemsEl.style.overflow = "hidden";
                    _itemsEl.style.position = "absolute";
                } else {
                    listEl.style.height = (list.length * itemHeight) + "px";
                    _itemsEl = listEl;
                }
                for(var i = 0; i < list.length; i++) {
                    var it = crateItemDom(list[i], i);
                    listItemEl.push(it);
                    _itemsEl.appendChild(it)
                }
                listEl.addEventListener("click", function(e) {
                    if(e && e.stopPropagation) {  
                        e.stopPropagation(); 
                    } 
                    else {  
                        window.event.cancelBubble = true; 
                    }
                });
                domEl.appendChild(listEl);

                showShareElement();
            } 
            if(e && e.stopPropagation) {  
                e.stopPropagation(); 
            } 
            else {  
                window.event.cancelBubble = true; 
            }
        });
        domEl.appendChild(mainEl);
    }

    var setSelectedIndex = function(i) {
        if(listEl != null) {

            if(selectedIndex != -1) {
                listItemEl[selectedIndex].style.backgroundColor = "";
                listItemEl[selectedIndex].children[0].style.color = menuTextFontColor;
            }
            listItemEl[i].style.backgroundColor = menuBackgroundHoverColor;
            listItemEl[i].children[0].style.color = menuTextFontHoverColor;
        }
        selectedIndex = i;
        text.innerText = list[selectedIndex];
        changeEventFn(list[selectedIndex], i);
    };

    var crateItemDom = function(val, i) {
        var item = document.createElement("div");

        item.style.width = (width - menuPositionX - menuWidhtPositionX - menuBorderWidth * 2) + "px";
        item.style.height = itemHeight + "px";
        var itemText = document.createElement("span");

        itemText.style.overflow = "hidden";
        itemText.style.whiteSpace = "nowrap";
        itemText.style.textOverflow = "ellipsis";
        itemText.innerText = val;
        itemText.style.lineHeight = itemHeight + "px";
        itemText.style.color = menuTextFontColor;
        itemText.style.paddingLeft = paddingLeft + "px";
        itemText.style.fontSize = fontSize + "px";
        item.appendChild(itemText);

        if(i == selectedIndex) {
            item.style.backgroundColor = menuBackgroundHoverColor;
            itemText.style.color = menuTextFontHoverColor;
        }

        item.addEventListener("click", function(e) {
            setSelectedIndex(i);
            $(listEl).hide();

            if(e && e.stopPropagation) {  
                e.stopPropagation(); 
            } 
            else {  
                window.event.cancelBubble = true; 
            }
        });
        item.addEventListener("mouseover", function() {
            itemText.style.color = menuTextFontHoverColor;
            this.style.backgroundColor = menuBackgroundHoverColor;
        });
        item.addEventListener("mouseout", function() {
            if(i != selectedIndex) {
                itemText.style.color = menuTextFontColor;
                this.style.backgroundColor = menuBackgroundColor;
            }
        });
        return item;
    }

    var createButtonDom = function() {
        buttonEl = document.createElement("div");
        if(imageSrc != null) {
            buttonEl.style.backgroundImage = imageSrc;
        }
        buttonEl.style.width = imageWidth + "px";
        buttonEl.style.height = imageHeight + "px";

        buttonEl.style.position = "absolute";
        buttonEl.style.right = (height / 2 - imageWidth / 2) + "px";
        buttonEl.style.top = (height / 2 - imageHeight / 2) + "px";
        mainEl.appendChild(buttonEl);

        var line = document.createElement("div");
        line.style.position = "absolute";
        line.style.right = height + "px";
        line.style.top = "0px";

        line.style.height = (height - borderWidth * 2) + "px";
        line.style.width = "1px";
        line.style.border = "none";
        line.style.backgroundColor = lineColor;

        mainEl.appendChild(line);
    }

    domEl = dom;

    if(option != null) {
        if(option.width != null) {
            width = option.width;
        }
        if(option.height != null) {
            height = option.height;
        }
        if(option.borderWidth != null) {
            borderWidth = option.borderWidth;
        }
        if(option.itemHeight != null) {
            itemHeight = option.itemHeight;
        } else {
            itemHeight = height - borderWidth;
        }
        if(option.borderColor != null) {
            borderColor = option.borderColor;
        }
        if(option.defaultValue != null) {
            defaultValue = option.defaultValue;
        }
        if(option.list != null) {
            list = option.list;
        }
        if(option.selectedIndex != null) {
            selectedIndex = option.selectedIndex;
        }
        if(option.onchange != null) {
            changeEventFn = option.onchange;
        }
        if(option.backgroundImage != null) {
            backgroundImage = option.backgroundImage;
        }
        if(option.menuPositionY != null) {
            menuPositionY = option.menuPositionY;
        }
        if(option.menuPositionX != null) {
            menuPositionX = option.menuPositionX;
        }
        if(option.menuWidhtPositionX != null) {
            menuWidhtPositionX = option.menuWidhtPositionX;
        }

        if(option.backgroundColor != null) {
            backgroundColor = option.backgroundColor;
        }
        if(option.backgroundHoverColor != null) {
            backgroundHoverColor = option.backgroundHoverColor;
        } else {
            backgroundHoverColor = backgroundColor;
        }

        if(option.textFontColor != null) {
            textFontColor = option.textFontColor;
        }
        if(option.textFontHoverColor != null) {
            textFontHoverColor = option.textFontHoverColor;
        }
        if(option.paddingLeft != null) {
            paddingLeft = option.paddingLeft;
        }
        if(option.fontSize != null) {
            fontSize = option.fontSize;
        }
        if(option.menuBackgroundColor != null) {
            menuBackgroundColor = option.menuBackgroundColor;
        }
        if(option.lineColor != null) {
            lineColor = option.lineColor;
        }
        if(option.menuBackgroundHoverColor != null) {
            menuBackgroundHoverColor = option.menuBackgroundHoverColor;
        }
        if(option.menuTextFontColor != null) {
            menuTextFontColor = option.menuTextFontColor;
        }
        if(option.menuTextFontHoverColor != null) {
            menuTextFontHoverColor = option.menuTextFontHoverColor;
        }
        if(option.valueBackgroundColor != null) {
            valueBackgroundColor = option.valueBackgroundColor;
        }
        if(option.menuBorderWidth != null) {
            menuBorderWidth = option.menuBorderWidth;
        }
        if(option.menuBorderColor != null) {
            menuBorderColor = option.menuBorderColor;
        }
        if(option.imageWidth != null) {
            imageWidth = option.imageWidth;
        }
        if(option.imageHeight != null) {
            imageHeight = option.imageHeight;
        }
        if(option.imageSrc != null) {
            imageSrc = option.imageSrc;
        }
        if(option.imageHoverSrc != null) {
            imageHoverSrc = option.imageHoverSrc;
        }
    }

    createMainStyle();
    createValueDom();
    createButtonDom();

    return {
        setSelectedIndex: function(index) {
            setSelectedIndex(index);
        },
        setData: function(l) {
            $(listEl).remove();
            listEl = null;
            listItemEl = [];
            list = l;
            selectedIndex = 0;
            setSelectedIndex(selectedIndex);
        },
        setChangeFn: function(fn) {
            changeEventFn = fn;
        },
        resize: function() {

        }
    }
};