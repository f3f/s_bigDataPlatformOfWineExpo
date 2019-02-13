if (typeof Object.create !== 'function') {
  //Douglas Crockford inheritance function
  Object.create = function (obj) {
    function F() { };
    F.prototype = obj;
    return new F();
  };
}

(function ($, w, d, undefined) {

  var NewsBox = {
    init: function (options, elem) {
      //cache the references
      var self = this;
      self.elem = elem;
      self.$elem = $(elem);

      self.newsTagName = self.$elem.find(":first-child").prop('tagName');
      self.newsClassName = self.$elem.find(":first-child").attr('class');

      self.timer = null;
      self.resizeTimer = null; // used with window.resize event 
      self.animationStarted = false;
      self.isHovered = false;
			
			clearTimeout(self.resizeTimer);

      if (typeof options === 'string') {
        //string was passed
        if (console) {
          console.error("String property override is not supported");
        }
        throw ("String property override is not supported");
      } else {
        //object was passed
        //extend user options overrides
        self.options = $.extend({}, $.fn.hotComment.options, options);

        self.prepareLayout();


        //autostart animation
        if (self.options.autoplay) {
          self.animate();
        }

        //enable users to override the methods
        if (typeof self.options.onToDo === 'function') {
          self.options.onToDo.apply(self, arguments);
        }

      }
    },
    prepareLayout: function () {
      var self = this;

      //checking mouse position

      $(self.elem).find('.' + self.newsClassName).on('mouseenter', function () {
        self.onReset(true);
      });

      $(self.elem).find('.' + self.newsClassName).on('mouseout', function () {
        self.onReset(false);
      });

      //set news visible / hidden
      $.map(self.$elem.find(self.newsTagName), function (newsItem, index) {
        if (index > self.options.newsPerPage - 1) {
          $(newsItem).hide();
        } else {
          $(newsItem).show();
        }
      });

      //prevent user to select more news that it actualy have

      if (self.$elem.find(self.newsTagName).length < self.options.newsPerPage) {
        self.options.newsPerPage = self.$elem.find(self.newsTagName).length;
      }

      //get height of the very first self.options.newsPerPage news
      var height = 0;

      $.map(self.$elem.find(self.newsTagName), function (newsItem, index) {
        if (index < self.options.newsPerPage) {
          height = parseInt(height) + parseInt($(newsItem).height()) + 10;
        }
      });

      $(self.elem).css({ "overflow-y": "hidden", "height": "100%" });
      // $(self.elem).css({ "overflow-y": "hidden", "height": height });

      //recalculate news box height for responsive interfaces
      $(w).resize(function () {
        if (self.resizeTimer !== null) {
          clearTimeout(self.resizeTimer);
        }
        self.resizeTimer = setTimeout(function () {
          self.prepareLayout();
        }, 200);
      });

    },
    findPanelObject: function () {
      var panel = this.$elem;

      while (panel.parent() !== undefined) {
        panel = panel.parent();
        if (panel.parent().hasClass('panel')) {
          return panel.parent();
        }
      }

      return undefined;
    },
    onStop: function () {
    },
    onPause: function () {
      var self = this;
      self.isHovered = true;
      if (this.options.autoplay && self.timer) {
        clearTimeout(self.timer);
      }
    },
    onReset: function (status) {
      var self = this;
      if (self.timer) {
        clearTimeout(self.timer);
      }

      if (self.options.autoplay) {
        self.isHovered = status;
        self.animate();
      }
    },
    animate: function () {
      var self = this;
      self.timer = setTimeout(function () {

        if (!self.options.pauseOnHover) {
          self.isHovered = false;
        }

        if (!self.isHovered) {
          if (self.options.direction === 'up') {
            self.onNext();
          } else {
            self.onPrev();
          }
        }
      }, self.options.newsTickerInterval);
    },
    onPrev: function () {

      var self = this;

      if (self.animationStarted) {
        return false;
      }

      self.animationStarted = true;
      // console.log($(self.$elem).find(self.newsTagName).last().attr('class'));
      var orgClassName=$(self.$elem).find(self.newsTagName).last().attr('class');

      var html = '<' + self.newsTagName + ' style="display:none;" class="' + orgClassName + '">' + $(self.$elem).find(self.newsTagName).last().html() + '</' + self.newsTagName + '>';
      $(self.$elem).prepend(html);
      $(self.$elem).find(self.newsTagName).first().slideDown(self.options.animationSpeed, function () {
        $(self.$elem).find(self.newsTagName).last().remove();
      });

      $(self.$elem).find(self.newsTagName + ':nth-child(' + parseInt(self.options.newsPerPage + 1) + ')').slideUp(self.options.animationSpeed, function () {
        self.animationStarted = false;
        self.onReset(self.isHovered);
      });

      $(self.elem).find('.' + self.newsClassName).on('mouseenter', function () {
        self.onReset(true);
      });

      $(self.elem).find('.' + self.newsClassName).on('mouseout', function () {
        self.onReset(false);
      });
    },
    onNext: function () {
      var self = this;

      if (self.animationStarted) {
        return false;
      }

      self.animationStarted = true;
      // console.log($(self.$elem).find(self.newsTagName).last().attr('class'));
      var orgClassName=$(self.$elem).find(self.newsTagName).first().attr('class');

      var html = '<' + self.newsTagName + ' style="display:none;" class=' + orgClassName + '>' + $(self.$elem).find(self.newsTagName).first().html() + '</' + self.newsTagName + '>';
      $(self.$elem).append(html);

      $(self.$elem).find(self.newsTagName).first().slideUp(self.options.animationSpeed, function () {
        $(this).remove();
      });

      $(self.$elem).find(self.newsTagName + ':nth-child(' + parseInt(self.options.newsPerPage + 1) + ')').slideDown(self.options.animationSpeed, function () {
        self.animationStarted = false;
        self.onReset(self.isHovered);
      });

      $(self.elem).find('.' + self.newsClassName).on('mouseenter', function () {
        self.onReset(true);
      });

      $(self.elem).find('.' + self.newsClassName).on('mouseout', function () {
        self.onReset(false);
      });
    }
  };

  // 扩展jQuery方法，实现自定义插件
  $.fn.hotComment = function (options) {
    //enable multiple DOM object selection (class selector) + enable chaining like $(".class").bootstrapNews().chainingMethod()
    return this.each(function () {
      var newsBox = Object.create(NewsBox);
      newsBox.init(options, this);
      // console.log(newsBox);
    });

  };

  // 自定义插件的默认选项
  $.fn.hotComment.options = {
    newsPerPage: 6, // 每页显示几条数据
    autoplay: true, // 自动滚动
    direction: 'down', // 滚动方向
    animationSpeed: 'normal', // 滚动速度 
    newsTickerInterval: 4000, //4 secs
    pauseOnHover: true,
    onStop: null,
    onPause: null,
    onReset: null,
    onPrev: null,
    onNext: null,
    onToDo: null
  };

})($, window, document);