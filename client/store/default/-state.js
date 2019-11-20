export const getDefaultState = () => ({
	data: [],
	count: 0,
	pagination: {
		skip: 0,
		limit: 10,
		sort: 'orderField ASC',
	},
	criteria: {},
	pageSize: 10
})