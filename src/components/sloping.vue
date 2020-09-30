<template>
  <div class="container">
    <div class="block" ref="block"></div>
  </div>
</template>

<script>
import Sloping from '../lib/sloping'

export default {
  data () {
    return {
      sloping: null
    }
  },
  mounted () {
    this.sloping = new Sloping(this.$refs.block)
  }
}
</script>

<style scoped>
.container {
  perspective: 300px;
  width: 100%;
}

.block {
  border-radius: 10px;
  background-color: #00bcd4;
  width: 300px;
  height: 200px;
  margin: 100px auto;
  transform-style: preserve-3d;
  box-shadow: rgba(0, 0, 0, 0.5) 0 0 40px 0px;
}

</style>
