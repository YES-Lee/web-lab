<template>
  <div class="image-show">
    <div class="container" :style="{ '--bg-url': `url(${url})` }">
      <img :src="url" class="image">
    </div>
    <input class="button" accept="image/*" type="file" @input="onInput($event)">
  </div>
</template>

<script>
export default {
  name: 'image-show-1',
  data () {
    return {
      url: 'images/show-image-1.jpeg'
    }
  },
  mounted () {
  },
  methods: {
    onInput (e) {
      const file = e.target.files[0]
      this.url = URL.createObjectURL(file)
    }
  }
}
</script>

<style lang="less" scoped>
.button {
  margin-top: 20px;
}
.container {
  width: fit-content;
  position: relative;
  overflow: hidden;
  border-radius: 2px;
  border: 6px solid #efefef;
}
.container::after {
  display: block;
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: var(--bg-url);
  position: 0;
  background-size: cover;
  filter: blur(10px);
}
.image {
  display: block;
  width: 256px;
  height: 256px;
  object-fit: contain;
  position: relative;
  z-index: 1;
}
</style>
