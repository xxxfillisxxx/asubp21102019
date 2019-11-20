const positionToOrderField = (position, oldOrderField = position * 10 + 10) => position * 10 + Math.sign(position * 10 - oldOrderField) * 5
const orderFieldToPosition = (orderField) => Math.floor(orderField / 10)

module.exports = {
	mapAttributes() {
		return {
			orderField: {
				type: 'number',
				defaultsTo: 5
			}
		}
	},
	mapCustomToJSON() {
		return {
			customToJSON: function () {
				return _.merge(this, { orderField: orderFieldToPosition(this.orderField) })
			},
		}
	},
	mapHooks(modelName) {
		return {

			beforeCreate(values, cb) {
				values.orderField = positionToOrderField(values.orderField)
				cb()
			},

			afterCreate: async (newRecord, cb) => {
				global[modelName].resort(newRecord)
					.then(() => cb())
					.catch(cb)
			},

			beforeUpdate: (valuesToUpdate, cb) => {
				global[modelName].findOne(valuesToUpdate.id).then(record => {
					valuesToUpdate.orderField = positionToOrderField(valuesToUpdate.orderField, record.orderField)
					this.needResort = valuesToUpdate.orderField !== undefined
					cb()
				})
			},

			afterUpdate: (updatedRecord, cb) => {
				if (this.needResort) {
					global[modelName].resort(updatedRecord)
						.then(() => cb())
						.catch(cb)
				}
			},

			afterDestroy: (destroyedRecord, cb) => {
				global[modelName].resort(destroyedRecord)
					.then(() => cb())
					.catch(cb)
			},
		}
	}
}