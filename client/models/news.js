import DataModel from './index'

class NewsSource extends DataModel {
}

NewsSource.prototype.schema = {
	id: {
		type: Number,
		required: true,
		default: 0
	},
	name: {
		type: String,
		required: true,
		default: '',
		title: 'Идентификатор'
	},
	title: {
		type: String,
		default: '',
		required: true,
		title: 'Заголовок'
	},
	url: {
		type: String,
		required: true,
		default: '',
		title: 'URL'
	},
	withProxy: {
		type: Boolean,
		required: true,
		default: false,
		title: 'Использовать прокси'
	},
	orderField: {
		type: Number,
		required: true,
		default: 1,
		title: 'Позиция'
	}
}

export default NewsSource