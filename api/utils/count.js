module.exports = {
	mapCountMethod(modelName) {
		return {
			count(req, res) {
				const model = global[modelName]
				model.count(req.allParams())
					.then(({ count }) => res.json(count))
					.catch(error => {
						console.error(error),
						res.status(500).json(error)
					})
			}
		}
	}
}
