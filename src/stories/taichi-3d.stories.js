import TaichiCss from '../components/taichi-3d.vue'
import { LabConfig } from '../config'

export default {
  title: `${LabConfig.name}/太极3D`,
  component: TaichiCss,
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

export const Taiji = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TaichiCss },
  template: '<taichi-css :duration="duration" />'
})
Taiji.args = {
  duration: 5
}
Taiji.storyName = '太极3D'
Taiji.parameters = {
  layout: 'center',
  backgrounds: {
    default: '灰色背景',
    values: [
      { name: '灰色背景', value: '#efefef' },
      { name: '共色背景', value: 'red' }
    ]
  }
}
