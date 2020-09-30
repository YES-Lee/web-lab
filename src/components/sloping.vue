<template>
  <div class="container">
    <div class="block" ref="block"></div>
  </div>
</template>

<script>
import Sloping from '../lib/sloping'

export default {
  props: {
    type: {
      type: String,
      default: 'lift'
    },
    hideShadow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sloping: null
    }
  },
  mounted () {
    this.sloping = new Sloping(this.$refs.block, {
      type: this.type,
      hideShadow: this.hideShadow
    })
  },
  watch: {
    type (newVal) {
      console.log('类型改变', this.sloping)
      if (this.sloping) {
        this.sloping.init({
          type: newVal
        })
      }
    },
    hideShadow (newVal) {
      if (this.sloping) {
        this.sloping.init({
          hideShadow: newVal
        })
      }
    }
  }
}
</script>

<style scoped>
.container {
  perspective: 300px;
  transform-style: preserve-3d;
  width: 100%;
}

.block {
  border-radius: 10px;
  background-color: #00bcd4;
  width: 300px;
  height: 200px;
  margin: 100px auto;
  /* box-shadow: rgba(0, 0, 0, 0.5) 0 0 40px 0px; */
}

</style>
