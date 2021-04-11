<template>
  <div class="wrap">
    <div class="container">
      <span id="text1"></span>
      <span id="text2"></span>
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
                    0 0 0 255 -180"
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
  mounted() {
    /*
    巧妙地利用SVG过滤器来创建“变形文本”效果。
    从本质上讲，它将两个文本元素层叠在一起，并根据哪个文本应该更突出来模糊它们。
    一旦应用了模糊，两个文本一起通过一个阈值过滤器，产生“胶粘”效果。(高端!!!)
  */

    const elts = {
      text1: document.querySelector("#text1"),
      text2: document.querySelector("#text2")
    };

    /** @param {Array} texts 设定要显示的文字 */
    const texts = this.msg.split(' ')

    /* 控制变形的速度。 */
    const morphTime = 1;
    const cooldownTime = 0.25;
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

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
    }

    /* 动画循环 */
    function animate() {
      let RAF = requestAnimationFrame(animate);

      let newTime = new Date();
      //
      let shouldIncrementIndex = cooldown > 0;
      let dt = (newTime - time) / 1400;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex++;
        }
        doMorph();
      } else {
        doCooldown();
      }
    }
    /* 启动动画。 */
    animate();
  }
}

</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Raleway:900&display=swap");

.container {
  position: absolute;
  width: 100vw;
  height: 60px;
  top: 0;
  bottom: 0;
  margin: auto;
  filter: url(#threshold) blur(0.6px);
}

#text1,
#text2 {
  position: absolute;
  width: 100%;
  display: inline-block;
  font-family: "Raleway", sans-serif;
  font-size: 60px;
  text-align: center;
  user-select: none;
  color: #f7fff7;
}
</style>