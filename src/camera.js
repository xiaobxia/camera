/**
 * Created by xiaobxia on 2017/8/17.
 */
class Camera {
  constructor(id, option) {
    this.$el = document.getElementById(id);
    this.userSuccessCallback = option.successCallback;
    this.userErrorCallback = option.errorCallback;
  }

  /*-------------------------  自身方法  -------------------------*/
  init() {
    const windowUrl = this.windowUrl();
    const getUserMedia = this.getUserMedia();
    let errorCallback = (err) => {
      console.log(err);
      this.userErrorCallback && this.userErrorCallback(err);
    };
    let successCallback = (stream) => {
      this.$el.src = windowUrl.createObjectURL(stream);
      this.userSuccessCallback && this.userSuccessCallback();
    };
    try {
      getUserMedia({video: true}, successCallback, errorCallback);
    } catch (err) {
      getUserMedia('video', successCallback, errorCallback);
    }
  }

  destroy() {
    this.$el.src = '';
    //防止报错
    let self = this;
    self = null;
  }

  /*-------------------------  对外暴露的工具函数  -------------------------*/
  windowUrl() {
    return window.URL || window.webkitURL || window.msURL || window.oURL;
  }

  getUserMedia() {
    let fn = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    return function (option, successCallback, errorCallback) {
      fn.call(navigator, option, successCallback, errorCallback);
    };
  }
}
