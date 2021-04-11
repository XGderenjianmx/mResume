/**
 * original_author: http://v.bootstrapmb.com/2020/3/1h2147511/
 * redit: bgsab123@163.com
 * @param {Object} set
 * id:[String] //节点标签 [必填] id选择器
 * value:[Number] // 百分比值 [必填]
 * bgColor: '', // 进度条背景颜色 十六进制 [选填] 默认为透明;  
 * cirColor: '#e54d42', // 进度条颜色 十六进制 [选填] 
 * textColor: '#f37b1d', // 字体颜色 十六进制 [选填] 
 * type:'danger', // 默认的可选样式,一般:primary;警告:warning;危险:danger;信息:info
 * lineCap: 'round', // 进度条末端类型 [可填] 默认:butt (平滑);round (圆形线帽)
 * target: 'default', // 进度条指定类型 [可填] 默认: default
 * size: 60,// 环形半径 [可填] 默认: 40
 * lineWidth: 14, // 进度条宽度 [可填] 默认: 8 最高60
 * open: 'between' // 进度条开始点 [可填] 默认: top 可选 bottom 、top 、between
 * 
 */
window.RAF = (function () {
  return (
    //兼容性处理
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})()
//TODO:简化传入参数;同时执行多个进度条;
var EnableCircle = function (set) {
  console.warn('使用了默认 300 * 150 的canvas')
  this.id = document.getElementById('circle');
  this.context = this.id.getContext("2d"); // 节点canvas上下文
  this.centerX = this.id.width / 2; // canvas绘制的中心点X
  this.centerY = this.id.height / 2; // canvas绘制的中心点Y
  //this.radCircle = (Math.PI * 2) / 100;
  this.bgColor = set.bgColor || "#3a4242";
  this.cirColor = set.cirColor || "#f7fff7";
  this.textColor = set.textColor || this.cirColor;
  this.size = this.rounded(set.size) || this.rounded(40);
  this.lineWidth = set.lineWidth ? set.lineWidth > 30 ? 30 : set.lineWidth : 6;

  this.data = set.data;
  this.zeroGroup = [];
  this.maxValueGroup = [];
  this.windowRafGroup = []; // 浏览器动画执行返回值
  this.sizeGroup = [];

  this.fontSize = this.rounded(this.size / 2) + "px" || "14px";
  this.clockWise = set.clockWise ? false : true; // 顺时针 / 逆时针(TODO)
  this.open = set.open || "top";
  this.lineCap = set.lineCap || "butt";
  this.type = set.type || "default";

  if (this.type && this.type !== "default") {
    this.cirColor = this.types[this.type].circleColor;
    this.bgColor = this.types[this.type].bgColor;
    this.textColor = this.types[this.type].textColor;
  }

  for (let index = 0; index < this.data.length; index++) {
    this.size -= 10
    this.maxValueGroup.push(this.data[index].value)
    this.zeroGroup.push(0)
    this.windowRafGroup.push(null)
    this.sizeGroup.push(this.size)
  }
  for (let index = 0; index < this.data.length; index++) {
    this.start(index)
  }
};
//
EnableCircle.prototype = {
  types: {
    primary: {
      circleColor: "#2196f3",
      bgColor: "#cce6ff",
      textColor: "#2196f3"
    },
    info: {
      circleColor: "#1cbbb4",
      bgColor: "#d7f0db",
      textColor: "#f37b1d"
    },
    warning: {
      circleColor: "#fbbd08",
      bgColor: "#fef2ce",
      textColor: "#f37b1d"
    },
    danger: {
      circleColor: "#e54d42",
      bgColor: "#fadbd9",
      textColor: "#f37b1d"
    }
  },
  //指示进度条
  peripheryCircle: function (m) {
    this.context.save();
    this.context.beginPath();
    this.context.strokeStyle = this.cirColor;
    this.context.fillStyle = this.cirColor;
    this.context.lineWidth = this.lineWidth;
    this.context.lineCap = this.lineCap;
    this.context.arc(
      this.centerX,
      this.centerY,
      this.sizeGroup[m],
      this.startPiont(),
      this.endPiont(this.zeroGroup[m]),
      false
    );
    this.shadow();
    this.context.stroke();
    this.context.restore();
  },

  //背景进度条 
  backdropCircle: function (m) {
    this.context.save();
    this.context.beginPath();
    this.context.fillStyle = this.bgColor;
    this.context.strokeStyle = this.bgColor;
    this.context.lineWidth = this.lineWidth;
    this.context.arc(
      this.centerX,
      this.centerY,
      this.sizeGroup[m],
      0,
      Math.PI * 2,
      false
    );
    this.context.stroke();
    this.context.closePath();
    this.context.restore();
  },
  //文字
  whiteText: function (n) {
    this.context.save();
    this.context.fillStyle = this.textColor;

    this.context.font = this.fontSize + " Helvetica";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText(n.toFixed(0), this.centerX, this.centerY);
    this.context.restore();
  },
  // 避免浮点运算
  rounded: function (somenum) {
    var round = (0.5 + somenum) | 0;
    round = ~~(0.5 + somenum);
    //x >>> 0本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为0。
    round = (0.5 + somenum) << 0;
    return round;
  },
  // 进度条开始点
  startPiont: function () {
    if (this.open === "top") {
      return -Math.PI * 0.5;
    } else if (this.open === "bottom") {
      return Math.PI * 0.5;
    } else if (this.open === "between") {
      return Math.PI * 0.7;
    } else {
      return -Math.PI * 0.5;
    }
  },
  // 进度条结束点
  endPiont: function (n) {
    if (this.open === "top") {
      return Math.PI * (2 * n * 0.01) + -Math.PI * 0.5;
    } else if (this.open === "bottom") {
      return Math.PI * (2 * n * 0.01) + Math.PI * 0.5;
    } else if (this.open === "between") {
      return Math.PI * (2 * n * 0.01) + Math.PI * 0.7;
    } else {
      return Math.PI * (2 * n * 0.01) + -Math.PI * 0.5;
    }
  },
  // 阴影设置
  shadow: function () {
    this.context.shadowColor = "#ffffff";
    this.context.shadowBlur = 1;
    this.context.shadowOffsetX = 0;
    this.contextshadowOffsetY = 0;
  },

  loop: function (m) {
    this.context.clearRect(0, 0, this.id.width, this.id.height);
    this.backdropCircle(m);
    this.peripheryCircle(m);
  },

  start: function (m) {
    let _that = this;
    this.loop(m);
    //在一次动画结束后再次调用RAF，保证动画连续进行，有点像递归
    this.windowRafGroup[m] = RAF(function () {
      _that.start();
    });
    //终止条件
    if (this.zeroGroup[m] >= this.maxValueGroup[m]) {
      window.cancelAnimationFrame(this.windowRafGroup[m]);
      return;
    } else {
      this.zeroGroup[m] += 0.5;
    }
  }
};
export default EnableCircle