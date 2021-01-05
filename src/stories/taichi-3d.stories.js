import TaichiCss from '../components/taichi-3d.vue'
import { LabConfig } from '../config'

export default {
  title: `${LabConfig.name}/太极3D`,
  component: TaichiCss,
  parameters: {
    layout: 'center',
    backgrounds: {
      default: '灰色背景',
      values: [
        { name: '灰色背景', value: '#efefef' },
        { name: '共色背景', value: 'red' }
      ]
    }
  },
  argTypes: {
    duration: {
      control: {
        type: 'number',
        min: 1,
        max: 10,
        step: 0.1
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TaichiCss },
  template: '<taichi-css :duration="duration" />'
})

export const Fast = Template.bind()
Fast.args = {
  duration: 1
}
Fast.storyName = '快'

export const Middle = Template.bind()
Middle.args = {
  duration: 3
}
Middle.storyName = '中'

export const slow = Template.bind()
slow.args = {
  duration: 6
}
slow.storyName = '慢'
