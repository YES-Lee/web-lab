<template>
  <div class="free-fall">
    <div>
      点击区域内任意位置
    </div>
    <canvas ref="canvas" class="canvas" width="800" height="400" @mousedown="handleClick">
      <h1>Sorry, Your browser does not support canvas.</h1>
    </canvas>
    <div>
      小球数量: {{this.balls.length}}
    </div>
    <div>
      <button @click="stopAnimation">STOP</button>
      <button @click="startAnimation">START</button>
    </div>
  </div>
</template>

<script>

class Ball {
  x = 0 // 圆心x坐标
  y = 0 // 圆心y坐标
  r = 0 // 半径
  aX = 0 // 水平方向加速度
  aY = 0 // 垂直方向加速度
  vX = 0 // x方向速度
  vY = 0 // y方向速度

  constructor ({
    x,
    y,
    r,
    aX = 0,
    aY = 0,
    vX = 0,
    vY = 0
  }) {
    this.x = x
    this.y = y
    this.r = r
    this.aX = aX
    this.aY = aY
    this.vX = vX
    this.vY = vY
  }

  draw (ctx) {
    if ((this.r + this.x) >= ctx.canvas.width || (this.r + this.y) >= ctx.canvas.height) return
    ctx.fillStyle = 'red'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fill()
  }

  move (ctx, t) {
    this.x = this.x + this.vX
    this.y = this.y + this.vY
    this.vX = this.aX + this.vX
    this.vY = this.aY + this.vY

    if ((this.vX < 0 && this.x <= this.r) || this.x >= (ctx.canvas.width - this.r)) {
      if (Math.abs(this.vX) < 0.01) {
        this.vX = 0
      }
      if (this.x <= this.r) {
        this.x = this.r
      }
      if (this.x >= (this.r + ctx.canvas.width)) {
        this.x = ctx.canvas.width - this.r
      }
      this.vX *= -1
    }
    if ((this.vY < 0 && this.y <= this.r) || this.y >= (ctx.canvas.height - this.r)) {
      if (Math.abs(this.vY) < 0.01) {
        this.vY = 0
      }
      if (this.y <= this.r) {
        this.y = this.r
      }
      if (this.y >= (ctx.canvas.height - this.r)) {
        this.y = ctx.canvas.height - this.r
      }
      this.vY *= -1
    }
  }
}

function renderFrame (callback) {
  let stop = false
  const step = (timestamp) => {
    callback && typeof callback === 'function' && callback(timestamp)
    if (!stop) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
  return {
    stop () {
      stop = true
    },
    start () {
      if (stop) {
        stop = false
        window.requestAnimationFrame(step)
      }
    }
  }
}

export default {
  data () {
    return {
      canvas: null,
      balls: [],
      frameAnimation: null
    }
  },
  mounted () {
    this.canvas = this.$refs.canvas
    // this.performAnimation()
    const ctx = this.canvas.getContext('2d')
    this.frameAnimation = renderFrame(() => {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      // ctx.fillStyle = 'rgba(255, 255, 255, 0.3)' // 拖尾
      // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      this.balls.forEach(ball => {
        ball.move(ctx)
        ball.draw(ctx)
        // if (ball.x >= ball.r + ctx.canvas.width) {
        //   this.balls.splice(this.balls.indexOf(ball), 1)
        // } else {
        //   ball.draw(ctx)
        // }
      })
    })
  },
  methods: {
    stopAnimation () {
      this.frameAnimation.stop()
    },
    startAnimation () {
      this.frameAnimation.start()
    },
    handleClick (event) {
      const { layerX, layerY } = event
      const ball = new Ball({
        x: layerX,
        y: layerY,
        r: 20,
        // aY: 0.3,
        vY: -2,
        vX: -2
      })
      // this.performAnimation(ball)
      this.balls.push(ball)
    }
  }
}
</script>

<style scoped>
.canvas {
  border: 1px solid #eee;
}
</style>
