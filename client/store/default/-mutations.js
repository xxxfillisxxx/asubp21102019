const SET_DATA = 'SET_DATA'
const SET_COUNT = 'SET_COUNT'
const SET_NEXTPAGE = 'SET_NEXTPAGE'
const SET_PREVPAGE = 'SET_PREVPAGE'
const SET_PAGE = 'SET_PAGE'
const SET_CRITERIA = 'SET_CRITERIA'

export const mutationNames = {
	SET_DATA,
	SET_COUNT,
	SET_NEXTPAGE,
	SET_PREVPAGE,
	SET_PAGE,
	SET_CRITERIA
}

export const getDefaultMutations = () => ({
	[SET_DATA](state, { data }) {
		state.data = data
	},
	[SET_COUNT](state, { count }) {
		state.count = count
	},
	[SET_NEXTPAGE](state) {
		state.pagination.skip += state.pageSize
	},
	[SET_PREVPAGE](state) {
		state.pagination.skip -= state.pageSize
	},
	[SET_PAGE](state, { page }) {
		state.pagination.skip = state.pageSize * (page - 1)
	},
	[SET_CRITERIA](state, { criteria }) {
		state.criteria = criteria
	}
})