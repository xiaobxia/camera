'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by xiaobxia on 2017/8/17.
 */
var Camera = function () {
  function Camera(id, option) {
    _classCallCheck(this, Camera);

    this.$el = document.getElementById(id);
    this.userSuccessCallback = option.successCallback;
    this.userErrorCallback = option.errorCallback;
  }

  /*-------------------------  自身方法  -------------------------*/


  _createClass(Camera, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var windowUrl = this.windowUrl();
      var getUserMedia = this.getUserMedia();
      var errorCallback = function errorCallback(err) {
        console.log(err);
        _this.userErrorCallback && _this.userErrorCallback(err);
      };
      var successCallback = function successCallback(stream) {
        _this.$el.src = windowUrl.createObjectURL(stream);
        _this.userSuccessCallback && _this.userSuccessCallback();
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
      this.$el.src = '';
      //防止报错
      var self = this;
      self = null;
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
  }]);

  return Camera;
}();