<template>
  <div class="taiji-container">
    <div class="white-container" :style="{ animationDuration: `${duration}s` }">
      <div class="head"></div>
      <div class="tail"></div>
    </div>
    <div class="black-container" :style="{ animationDuration: `${duration}s` }">
      <div class="tail"></div>
      <div class="head"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    duration: {
      type: Number,
      default: 5
    }
  }
}
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
  background-color: #efefef;
}
.taiji-container {
  transform-style: preserve-3d;
  width: 400px;
  height: 400px;
}

.white-container, .black-container {
  width: 200px;
  height: 400px;
  position: absolute;
}

.white-container {
  transform-origin: 100% 50%;
  animation: taijiRunWhite linear infinite;
}

.black-container {
  right: 0;
  transform-origin: 0 50%;
  animation: taijiRunBlack linear infinite;
}

.white-container .head {
  width: 200px;
  height: 200px;
  background-color: #fff;
  position: relative;
  border-top-left-radius: 200px;
}
.white-container .head::after {
  display: block;
  content: '';
  width: 200px;
  height: 200px;
  position: absolute;
  right: -100px;
  border-radius: 50%;
  background-color: #fff;
}
.white-container .tail {
  width: 200px;
  height: 200px;
  position: relative;
  border-bottom-left-radius: 200px;
  background: radial-gradient(circle at 200px, transparent 100px, #fff 100px);
}

.black-container .head {
  width: 200px;
  height: 200px;
  background-color: #000;
  position: relative;
  border-bottom-right-radius: 200px;
}
.black-container .head::after {
  display: block;
  content: '';
  width: 200px;
  height: 200px;
  position: absolute;
  left: -100px;
  border-radius: 50%;
  background-color: #000;
}
.black-container .tail {
  width: 200px;
  height: 200px;
  position: relative;
  border-top-right-radius: 200px;
  background: radial-gradient(circle at 0, transparent 100px, #000 100px);
}

@keyframes taijiRunWhite {
  from {
    transform: rotateY(60deg) rotateZ(45deg);
  }
  to {
    transform: rotateY(60deg) rotateZ(405deg);
  }
}
@keyframes taijiRunBlack {
  from {
    transform: rotateX(70deg) rotateZ(00deg);
  }
  to {
    transform: rotateX(70deg) rotateZ(360deg);
  }
}
</style>
