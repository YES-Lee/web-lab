import Fab from '../components/fab.vue'
import { LabConfig } from '../config'

export default {
  title: `${LabConfig.name}/FAB`,
  component: Fab,
  argTypes: {
    position: {
      control: {
        type: 'select',
        options: ['left', 'top', 'right', 'bottom', 'left-top', 'right-top', 'left-bottom', 'right-bottom']
      },
      defaultValue: 'bottom'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Fab },
  template: '<fab :position="position" />'
})

export const Middle = Template.bind()
Middle.storyName = 'FAB'
Middle.args = {
  position: 'bottom'
}
