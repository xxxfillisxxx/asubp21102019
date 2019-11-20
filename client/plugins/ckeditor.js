import Vue from 'vue'

import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

CKEditor.component.props.editor.default = ClassicEditor

Vue.component('ckeditor',CKEditor.component)

