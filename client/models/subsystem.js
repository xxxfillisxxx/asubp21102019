import DataModel from './index'

class Subsystem extends DataModel {
}

Subsystem.prototype.schema = {
    id: {
      type: Number,
      required: true,
      default: 0
    },
    name: {
      type: String,
      required: true,
      default: '',
      title: 'Название подсистемы'
    },
    description: {
      type: String,
      default: '',
      title: 'Описание'
    },
    orderField: {
      type: Number,
      required: true,
      default: 1,
      title: 'Позиция'
    },
}

export default Subsystem