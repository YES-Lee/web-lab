import TaichiCss from '../components/taichi-3d.vue'
import { LabConfig } from '../config'

export default {
  title: `${LabConfig.name}/Tai Chi`,
  component: TaichiCss
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TaichiCss },
  template: '<taichi-css :duration="duration" />'
})

export const Middle = Template.bind()
Middle.storyName = 'Tai Chi'
