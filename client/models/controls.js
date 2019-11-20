import DataModel from './index'

class Controls extends DataModel {
}

Controls.prototype.schema = {
    id: {
      type: Number,
      required: true,
      default: 0
    },
    title: {
      type: String,
      required: true,
      default: '',
      title: 'Название контроля'
    },
    description: {
      type: String,
      default: '',
      title: 'Описание'
    },
    formula: {
      type: String,
      default: '',
      title: 'Формула'
    },
}

export default Controls