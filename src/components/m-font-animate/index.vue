<template>
  <div class="wrap">
    <div class="container">
      <span id="text1" ref="text1"></span>
      <span id="text2" ref="text2"></span>
    </div>
    <svg id="filter">
      <defs>
        <filter id="threshold">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 255 -110"
          />
        </filter>
      </defs>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'mFontAnimate',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      timer: null
    }
  },
  mounted() {
    /**
     * 本质上讲，它将两个文本元素层叠在一起，并根据哪个文本应该更突出来模糊它们。一旦应用了模糊，两个文本一起通过一
     * 个阈值过滤器，产生“胶粘”效果。(高端!!!)
     */
    "use strict"

    const _that = this;
    const elts = {
      text1: document.querySelector('#text1'),
      text2: this.$refs.text2
    };

    /** @param {Array} texts 设定要显示的文字 */
    const texts = this.msg.split(' ');

    /** 控制变形的速度 
     * 此处的duration只表示倍率关系，不代表实际时间
    */
    const morphTime = 1;// doMorph.duration
    const cooldownTime = 0.7;// doCooldown.duration
    let textIndex = texts.length - 1;
    /**
     * 在整个流程中，cooldown，morph就类似于开关(toggle)，当其值大于0，则执行相关的函数
     */
    let morph = 0;
    let cooldown = cooldownTime;
    /**
     * 增加doCooldown函数的开关，让函数在执行第一次后就停止重复添加相同css属性
     */
    let cooldownToggle = true;
    let RAF = null;
    let anTimes = 0;//动画循环次数（一次指更换一次显示的文字）

    /**
     * 初始text1和text2分别是数组末尾和首位，后续随着textIndex增加，两者依旧保持下标差值，
     * 
     */
    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];

    function doMorph() {
      morph -= cooldown;
      cooldown = 0;

      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);

    }

    /* 将模糊过滤器应用于文本 */
    function setMorph(fraction) {
      /**非线性渐变
       * 其中，透明度（opcity）是一个底数介于0到1之间，指数小于1的幂函数，即变化幅度在逐渐变小,ease-out?
       * 其实也可以直接用fraction...
       * text1和text2的透明度增减方向相反，而且初始text2文字透明度为100%
      */
      elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      fraction = 1 - fraction;
      elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      elts.text1.textContent = texts[textIndex % texts.length];
      elts.text2.textContent = texts[(textIndex + 1) % texts.length];
    }

    function doCooldown() {
      morph = 0;
      elts.text2.style.filter = "";
      elts.text2.style.opacity = "100%";

      elts.text1.style.filter = "";
      elts.text1.style.opacity = "0%";
      cooldownToggle = false;
    }

    /* 文字动画循环 */
    function animate() {
      if (anTimes >= texts.length) {
        RAF ? cancelAnimationFrame(RAF) : null
        _that.timer = setTimeout(() => { _that.$router.push('./home') }, 2000)
      } else {
        RAF = requestAnimationFrame(animate);
        let shouldIncrementIndex = cooldown > 0;//判断是否切换下一组文字

        /** 正常执行源码打印出来是step≈0.016，可以看出requestAnimationFrame函数每大约16ms执行一次传入的函数，即每秒渲染60帧(当前代码修改过，但requestAnimationFrame确实是默认每16ms执行一次)
         * 当使用断点在chrome调试的时候，step值会由于new Date()对象执行的时间发生变化
         * 在断点调试中发现，只有在初次加载的时候有vue介入加载页面，后续动画执行过程完全没有跟vue相关的内容？
        */

        /**
         * step控制整个动画的播放速度，step越小，播放得越慢，但是单位时间渲染次数是不变的，所以整个动画的播放流程变长了，即总的渲染次数是变多了，而且每次渲染跟上一次的差值相对变小了，整体流畅度感官上是提高了
         * 假设cooldown从0.5->0，step=1 / 360，则整个动画流程中，执行doCooldown的时间是:0.5 / ( 1 / 360 ) / 60 = 3(s)，而执行doMorph的时间是doCooldown的两倍，即6s，一个完整的换字动画耗时9s
         */
        let step = 1 / 60;
        cooldown -= step;

        if (cooldown <= 0) {
          if (shouldIncrementIndex) {
            textIndex++
            anTimes++
          }
          doMorph();
          cooldownToggle = true
        } else {
          cooldownToggle ? doCooldown() : null
        }
      }
    }
    animate();
    /**文字动画结束后 */

  },
  destroyed() {
    clearTimeout(this.timer)
    this.timer = null
  }
}

</script>
<style lang="scss">
@import url("https://fonts.font.im/css?family=Oleo+Script|Permanent+Marker");

.wrap {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: $theme-color;
}
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
  height: 80px;
  filter: url(#threshold) blur(0.1px);
}

#text1,
#text2 {
  display: inline-block;
  position: absolute;
  width: 100%;
  font-family: "Permanent Marker", cursive;
  font-family: "Oleo Script", cursive;
  font-size: 80px;
  user-select: none;
  text-align: center;
  color: #f7fff7;
}
</style>