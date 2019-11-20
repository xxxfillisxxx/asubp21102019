import DataModel from './index'

class Category extends DataModel {
}

Category.prototype.schema = {
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
	orderField: {
		type: Number,
		required: true,
		default: 1,
		title: 'Позиция'
	},
}

export default Category