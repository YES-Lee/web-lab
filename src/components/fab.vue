<template>
  <div
    class="fab"
    :class="[{ show_menu }, `fab_position--${autoPosition || position}`]"
    :style="style"
    @mousedown="handleMousedown"
  >
    <div class="fab_control" @click="show_menu = !show_menu">+</div>
    <div class="fab_menu_group">
      <span class="fab_menu"></span>
      <span class="fab_menu"></span>
      <span class="fab_menu"></span>
      <span class="fab_menu"></span>
      <span class="fab_menu"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: 'right-bottom'
    }
  },
  data () {
    return {
      show_menu: false,
      coord: {
        x: 0,
        y: 0
      },
      style: {
        left: '160px',
        top: '160px'
      },
      autoPosition: null
    }
  },
  methods: {
    handleMousedown ($downEvent) {
      this.coord.x = $downEvent.pageX
      this.coord.y = $downEvent.pageY
      const rect = $downEvent.target.getBoundingClientRect()
      const move = $e => {
        const dX = $e.pageX - this.coord.x + rect.x
        const dY = $e.pageY - this.coord.y + rect.y
        if (dX < rect.width * 2 && dY < rect.height * 2) {
          this.autoPosition = 'left-top'
        } else if (dX < rect.width * 2 && dY > window.innerHeight - (rect.height * 2)) {
          this.autoPosition = 'left-bottom'
        } else if (dX > window.innerWidth - (rect.width * 2) && dY < rect.height * 2) {
          this.autoPosition = 'right-top'
        } else if (dX > window.innerWidth - (rect.width * 2) && dY > window.innerHeight - (rect.height * 2)) {
          this.autoPosition = 'right-bottom'
        } else if (dX < rect.width * 2) {
          this.autoPosition = 'left'
        } else if (dX > window.innerWidth - (rect.width * 2)) {
          this.autoPosition = 'right'
        } else if (dY < rect.width * 2) {
          this.autoPosition = 'top'
        } else if (dY > window.innerHeight - (rect.height * 2)) {
          this.autoPosition = 'bottom'
        } else {
          this.autoPosition = null
        }
        this.style.left = `${dX}px`
        this.style.top = `${dY}px`
      }
      window.addEventListener('mousemove', move)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', move)
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import 'fab';

.fab {
  position: fixed;
  left: 40%;
  top: 40%;
  user-select: none;
  .fab_control {
    width: $fab-size;
    height: $fab-size;
    line-height: $fab-size;
    border-radius: 50%;
    background-color: #607d8b;
    text-align: center;
    transition: .4s cubic-bezier(0, 0, .382, 1.618);
    transition-property: transform;
    cursor: pointer;
    color: #fff;
    font-size: 32px;
    line-height: 48px;
  }
  .fab_menu_group {
    .fab_menu {
      position: absolute;
      z-index: -1;
      width: $fab-menu-size;
      height: $fab-menu-size;
      border-radius: 50%;
      background: rgba(0,0,0,0.8);
      line-height: $fab-menu-size;
      opacity: 0;
      transform: scale(0.5);
      cursor: pointer;
      transition: .4s cubic-bezier(0, 0, .382, 1.618);
      transition-property: transform, opacity;
      &:nth-child(n + 6) { // 超出5个菜单不显示
        display: none;
      }
    }
  }
  &.fab_position--bottom {
    @include fab-bottom;
  }
  &.fab_position--top {
    @include fab-top;
  }
  &.fab_position--left {
    @include fab-left;
  }
  &.fab_position--right {
    @include fab-right;
  }
  &.fab_position--left-top, &.fab_position--top-left {
    @include fab-left-top;
  }
  &.fab_position--right-top, &.fab_position--top-right {
    @include fab-right-top;
  }
  &.fab_position--left-bottom, &.fab_position--bottom-left {
    @include fab-left-bottom;
  }
  &.fab_position--right-bottom, &.fab_position--right-bottom {
    @include fab-right-bottom;
  }
  &.show_menu {
    .fab_control {
      transform: rotateZ(90deg);
    }
    .fab_menu {
      opacity: 1;
    }
  }
}
</style>
