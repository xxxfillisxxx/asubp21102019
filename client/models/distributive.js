import DataModel from './index'

class Distributive extends DataModel {
}

Distributive.prototype.schema = {
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
	server_bd: {
		type: String,
		required: true,
		default: '',
		title: 'Сервер баз данных'
    },
    db_ms:{
        type: String,
		required: true,
		default: '',
		title: 'СУБД'
    },
	bd_name: {
		type: String,
		required: true,
		default: '',
		title: 'Название базы данных'
	},
	server_app: {
		type: String,
		required: true,
		default: '',
		title: 'Сервер приложений'
	},
	server_update: {
		type: String,
		required: true,
		default: '',
		title: 'Сервер обновлений'
	},
	server_web: {
		type: String,
		required: true,
		default: '',
		title: 'Сервер WEB приложений'
	},
	orderField: {
		type: Number,
		required: true,
		default: 1,
		title: 'Позиция'
	},
}

export default Distributive
