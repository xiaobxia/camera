'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by xiaobxia on 2017/8/17.
 */
(function () {
  //判断ie的版本
  var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  var MOZ_HACK_REGEXP = /^moz([A-Z])/;
  var ieVersion = new Number(document.documentMode);
  //驼峰
  var camelCase = function camelCase(name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
  };
  var _getStyle = ieVersion < 9 ? function (element, styleName) {
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
      styleName = 'styleFloat';
    }
    try {
      switch (styleName) {
        case 'opacity':
          try {
            return element.filters.item('alpha').opacity / 100;
          } catch (e) {
            return 1.0;
          }
        default:
          if (window.getComputedStyle) {
            //在浏览器中返回关联document的window对象，如果没有则返回null
            var view = element.ownerDocument.defaultView;

            if (!view || !view.opener) {
              view = window;
            }
            return view.getComputedStyle(element)[styleName];
          } else {
            return element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null;
          }
      }
    } catch (e) {
      return element.style[styleName];
    }
  } : function (element, styleName) {
    if (!element || !styleName) return null;
    styleName = camelCase(styleName);
    if (styleName === 'float') {
      styleName = 'cssFloat';
    }
    try {
      var computed = document.defaultView.getComputedStyle(element, '');
      return element.style[styleName] || computed ? computed[styleName] : null;
    } catch (e) {
      return element.style[styleName];
    }
  };

  var Camera = function () {
    function Camera(id) {
      _classCallCheck(this, Camera);

      this.$el = document.getElementById(id);
      this.mediaStreamTrack = null;
      this.imageSrcList = [];
    }

    /*-------------------------  自身方法  -------------------------*/


    _createClass(Camera, [{
      key: 'init',
      value: function init(success, error) {
        var _this = this;

        var windowUrl = this.windowUrl();
        var getUserMedia = this.getUserMedia();
        var errorCallback = function errorCallback(err) {
          console.log(err);
          error && error(err);
        };
        var successCallback = function successCallback(stream) {
          _this.mediaStreamTrack = stream.getTracks()[0];
          _this.$el.src = windowUrl.createObjectURL(stream);
          success && success();
        };
        try {
          getUserMedia({ video: true }, successCallback, errorCallback);
        } catch (err) {
          getUserMedia('video', successCallback, errorCallback);
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.mediaStreamTrack && this.mediaStreamTrack.stop();
        this.$el.src = '';
        //防止报错
        var self = this;
        self = null;
      }

      /*-------------------------  拍摄方法  -------------------------*/

    }, {
      key: 'shoot',
      value: function shoot(option, callback) {
        var $el = this.$el;
        var x = option.x || 0;
        var y = option.y || 0;
        var width = option.width || _getStyle($el, 'width').slice(0, -2);
        var height = option.height || _getStyle($el, 'height').slice(0, -2);
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage($el, x, y, +width, +height);
        var imageSrc = canvas.toDataURL("image/png");
        this.imageSrcList.push(imageSrc);
        callback && callback(imageSrc);
      }

      /*-------------------------  对外暴露的工具函数  -------------------------*/

    }, {
      key: 'windowUrl',
      value: function windowUrl() {
        return window.URL || window.webkitURL || window.msURL || window.oURL;
      }
    }, {
      key: 'getUserMedia',
      value: function getUserMedia() {
        var fn = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        return function (option, successCallback, errorCallback) {
          fn.call(navigator, option, successCallback, errorCallback);
        };
      }
    }, {
      key: 'toCamelCase',
      value: function toCamelCase(str) {
        return camelCase(str);
      }
    }, {
      key: 'getStyle',
      value: function getStyle(el, styleName) {
        return _getStyle(el, styleName);
      }
    }]);

    return Camera;
  }();

  if (typeof module !== 'undefined' && (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = Camera;
  } else {
    window.Camera = Camera;
  }
})();