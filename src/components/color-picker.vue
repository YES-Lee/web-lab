<template>
  <div class="color-picker">
    <canvas height="80" width="80" ref="colorIndicator" class="color-indicator" />
    <canvas ref="canvas" width="300" height="300" @mousemove="handleMove" @click="handleClick"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      canvas: null,
      colorIndicator: null,
      colorData: {
        R: 0,
        G: 0,
        B: 0,
        A: 1
      }
    }
  },
  mounted () {
    this.init()
    this.initIndicator()
  },
  watch: {
    image (newVal) {
      console.log('变换图片', newVal)
      this.init(newVal)
    }
  },
  methods: {
    init (image) {
      this.canvas = this.$refs.canvas
      const ctx = this.canvas.getContext('2d')
      ctx.clearRect(0, 0, 300, 300)
      const img = new Image()
      img.src = image || this.image

      img.onload = function () {
        console.log('图片加载完毕')
        ctx.drawImage(img, 0, 0, 300, 300)
      }
    },
    initIndicator () {
      this.colorIndicator = this.$refs.colorIndicator
      const ctx = this.colorIndicator.getContext('2d')
      const width = 80
      const height = 80
      const gridSize = 8
      ctx.strokeStyle = '#eee'
      ctx.lineWidth = 1
      for (let r = 1; r < height / gridSize; r++) {
        ctx.beginPath()
        ctx.moveTo(r * gridSize, 0)
        ctx.lineTo(r * gridSize, width)
        ctx.closePath()
        ctx.stroke()
      }
      for (let c = 1; c < width / gridSize; c++) {
        ctx.beginPath()
        ctx.moveTo(0, c * gridSize)
        ctx.lineTo(height, c * gridSize)
        ctx.closePath()
        ctx.stroke()
      }
    },
    handleMove (event) {
      const ctx = this.canvas.getContext('2d')
      const x = event.layerX
      const y = event.layerY
      const imageData = ctx.getImageData(x, y, 1, 1)
      this.colorData.R = imageData.data[0]
      this.colorData.G = imageData.data[1]
      this.colorData.B = imageData.data[2]
      this.colorData.A = imageData.data[3] / 255
      const block = ctx.getImageData(x - 5, y - 5, 10, 10)
      // for (let i = 0; i < 100; i++) {
      //   const base = i * 4
      //   const point = block.data.slice(base, base + 4)
      //   const color = `rgba(${point.join(',')})`
      //   const r = Math.floor(i / 10)
      //   const c = i % 10
      //   // this.drawPoint(c * 8, r * 8, color)
      // }
      this.drawPoints(block)
    },
    handleClick () {
      const { R, G, B, A } = this.colorData
      window.navigator.clipboard.writeText(`rgba(${R}, ${G}, ${B}, ${A})`).then(() => {
        window.alert('颜色已复制到剪贴板')
      })
    },
    drawPoints (imageData) {
      const ctx = this.colorIndicator.getContext('2d')
      // ctx.putImageData(imageData, 0, 0)
      ctx.drawImage(this.canvas, 0, 0, 80, 80)
    }
  }
}
</script>

<style scoped>
canvas {
  display: block;
}
.color-indicator {
  margin-bottom: 10px;
  /* border-radius: 50%; */
  border: 1px solid #eee;
}
</style>
