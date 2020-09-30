import { LabConfig } from '../config'
import Sloping from '../components/sloping.vue'

export default {
  title: `${LabConfig.name}/鼠标悬浮倾斜效果`,
  argTypes: {
    type: {
      control: {
        type: 'inline-radio',
        options: ['lift', 'sink']
      }
    },
    hideShadow: {
      control: 'boolean'
    },
    shadowColor: {
      control: 'color'
    }
  }
}

export const SlopingEffectLift = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Sloping },
  template: '<sloping></sloping>'
})
SlopingEffectLift.args = {
  type: 'lift'
}
SlopingEffectLift.storyName = '上浮'

export const SlopingEffectSink = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Sloping },
  template: '<sloping></sloping>'
})
SlopingEffectSink.args = {
  type: 'sink'
}
SlopingEffectSink.storyName = '下沉'

export const SlopingEffectShadow = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Sloping },
  template: '<sloping></sloping>'
})
SlopingEffectSink.args = {
  hideShadow: true
}
SlopingEffectShadow.storyName = '隐藏阴影'
