import { LabConfig } from '../config'

export default {
  title: `${LabConfig.name}/Canvas图像处理`
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {},
  template: '<div></div>'
})

export const Filter = Template.bind()
Filter.storyName = '高斯模糊'
