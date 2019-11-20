import DataModel from './index'

class Contact extends DataModel {
}

Contact.prototype.schema = {
	id: {
		type: Number,
		required: true,
		default: 0
	},
	name: {
		type: String,
		required: true,
		default: '',
		title: 'ФИО'
	},
	position: {
		type: String,
		required: true,
		default: '',
		title: 'Должность'
	},
	phone: {
		type: String,
		required: true,
		default: '',
		title: 'Телефон'
	},
	email: {
		type: String,
		required: true,
		default: '',
		title: 'Почта'
	},
	icq: {
		type: String,
		required: true,
		default: '',
		title: 'ICQ'
	},
	linkService: {
		type: String,
		required: true,
		default: '',
		title: 'Cсылка на сервис обращений'
	},
	orderField: {
		type: Number,
		required: true,
		default: 1,
		title: 'Позиция'
    },
    isFemale: {
		type: Boolean,
		required: true,
		default: false,
		title: 'Женский'
	}
}

export default Contact
