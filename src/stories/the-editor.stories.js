import { LabConfig } from '../config'
import TheEditor from 'the-editor'
import 'the-editor/dist/the-editor.css'

export default {
  title: `${LabConfig.name}/The Editor`
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<div ref="editor"></div>',
  data () {
    return {
      editor: null
    }
  },
  mounted () {
    this.editor = new TheEditor(this.$refs.editor, {
      value: '# The Editor',
      gfm: true,
      lineNumbers: true,
      imageUploadAdaptor: files => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(files.map(item => URL.createObjectURL(item)))
          }, 1000)
        })
      }
    })
  }
})

export const Editor1 = Template.bind()
Editor1.storyName = 'The Editor'
