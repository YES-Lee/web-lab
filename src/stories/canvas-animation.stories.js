import { LabConfig } from '../config'
import FreeFall from '../components/free-fall.vue'

export default {
  title: `${LabConfig.name}/canvas动画`,
  subcomponents: {
    FreeFall
  }
}

export const FreeFall1 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    FreeFall
  },
  template: '<free-fall />'
})
FreeFall1.storyName = '运动的小球1'
