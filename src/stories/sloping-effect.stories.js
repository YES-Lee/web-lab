import { LabConfig } from '../config'
import Sloping from '../components/sloping.vue'

export default {
  title: `${LabConfig.name}/鼠标悬浮倾斜效果`,
  argTypes: {
    type: {
      control: {
        type: 'inline-radio',
        options: ['lift', 'sink']
      },
      defaultValue: 'lift'
    },
    hideShadow: {
      control: 'boolean',
      defaultValue: false
    },
    shadowColor: {
      control: 'color'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Sloping },
  template: '<sloping :type="type" :hideShadow="hideShadow"></sloping>'
})

export const SlopingEffectLift = Template.bind()
SlopingEffectLift.args = {
  type: 'lift'
}
SlopingEffectLift.storyName = '上浮'

export const SlopingEffectSink = Template.bind()
SlopingEffectSink.args = {
  type: 'sink'
}
SlopingEffectSink.storyName = '下沉'

export const SlopingEffectShadow = Template.bind()
SlopingEffectShadow.args = {
  hideShadow: true
}
SlopingEffectShadow.storyName = '隐藏阴影'
