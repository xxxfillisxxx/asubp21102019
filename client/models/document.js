import DataModel from './index'

class Document extends DataModel {
}

Document.prototype.schema = {
	id: {
		type: Number,
		required: true,
		default: 0
	},
	name: {
		type: String,
		required: true,
		default: '',
		title: 'Название'
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
	publishedAt: {
		type: Date,
		required: true,
		default: new Date(),
		title: 'Дата публикации'
	},
	file: {
		type: File,
		required: true,
		default: null,
		title: 'Файл'
	}
}

export default Document