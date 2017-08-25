# camera
摄像头调用库，基于H5的api
## 使用
- browser: window.Camera
```html
<!--在head引入camera.js-->
<script src="./camera.js"></script>
<!--需要有用于初始化的video元素-->
<video id="myCamera" autoplay style="width: 500px;height: 500px"></video>
<img src="" alt="" id="img">
<button id="btn">拍摄</button>
<script>
  var myCamera = new Camera('myCamera');
  myCamera.init(function () {
    console.log('success');
  },function (err) {
    console.log('error');
  });
  btn.addEventListener('click', function () {
    myCamera.shoot({}, function (imageSrc) {
      document.getElementById('img').src = imageSrc;
      console.log(myCamera.imageSrcList)
    });
  }, false);
</script>
```
## 方法
#### init([successCallback, errorCallback])
初始化
#### destroy()
销毁
#### shoot([option, callback])
- **option**
  - x
  - y
  - width
  - height
- **callback**
> 拍照成功的回调，参数是照片的base64
## 工具
#### windowUrl()
返回浏览器兼容的window.URL对象
#### getUserMedia()
返回浏览器兼容的navigator.getUserMedia函数
#### toCamelCase(str)
字符串转驼峰
#### getStyle(el, styleName)
返回样式的值
