import { LabConfig } from '../config'
import Vue from 'vue'
import ColorPicker from '../components/color-picker.vue'

const IMAGE_MAP = Vue.observable({
  Lena: '/images/lena.jpg',
  Pumpkin: '/images/pumpkin.jpg'
})

export default {
  title: `${LabConfig.name}/颜色提取器`,
  component: ColorPicker,
  argTypes: {
    image: {
      defaultValue: 'Lena',
      control: {
        type: 'select',
        options: Object.keys(IMAGE_MAP)
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    ColorPicker
  },
  template: '<color-picker :image="imageUrl" />',
  computed: {
    imageUrl () {
      return IMAGE_MAP[this.image]
    }
  }
})

// export const Lena = Template.bind()
// Lena.args = {
//   image: 'Lena'
// }
// export const Pumpkin = Template.bind()
// Pumpkin.args = {
//   image: 'Pumpkin'
// }
