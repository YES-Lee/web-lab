import ImageShow1 from '../components/image-show-1.vue'
import { LabConfig } from '../config'

export default {
  title: `${LabConfig.name}/图片显示`,
  component: ImageShow1
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ImageShow1: ImageShow1 },
  template: '<image-show-1 />'
})

export const Effect1 = Template.bind()
Effect1.storyName = '效果1'
