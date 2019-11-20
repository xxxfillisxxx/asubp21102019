import { mutationNames } from './-mutations'

const { SET_COUNT, SET_NEXTPAGE, SET_PREVPAGE, SET_PAGE: SET_PAGE_MUTATION, SET_CRITERIA } = mutationNames

const GET_ITEMS = 'GET_ITEMS'
const GET_ITEM = 'GET_ITEM'
const COUNT_ITEMS = 'COUNT_ITEMS'

const CREATE_ITEM = 'CREATE_ITEM'
const EDIT_ITEM = 'EDIT_ITEM'
const DESTROY_ITEMS_BY_ID = 'DESTROY_ITEMS_BY_ID'

const SET_PAGE = 'SET_PAGE'
const NEXTPAGE = 'NEXTPAGE'
const PREVPAGE = 'PREVPAGE'
const UPDATE_CRITERIA = 'UPDATE_CRITERIA'
const GET_ITEMS_FRONT ='GET_ITEMS_FRONT'

export const actionNames = {
	GET_ITEMS,
	GET_ITEM,
	COUNT_ITEMS,
	CREATE_ITEM,
	EDIT_ITEM,
	DESTROY_ITEMS_BY_ID,
	SET_PAGE,
    UPDATE_CRITERIA,
    GET_ITEMS_FRONT
}

export const getDefaultActions = (API) => ({
    [GET_ITEMS_FRONT]:async function ({ commit, dispatch, state }) {
        const payload = { ...state.criteria }
		const [ { data } ] = await Promise.all([
			this.$axios.get(API, { params: payload }),
			dispatch(COUNT_ITEMS, state.criteria)
		])

		commit('SET_DATA', { data })
    },
    [GET_ITEMS]: async function ({ commit, dispatch, state }) {
        const payload = { ...state.pagination, ...state.criteria }
		const [ { data } ] = await Promise.all([
			this.$axios.get(API, { params: payload }),
			dispatch(COUNT_ITEMS, state.criteria)
		])

		commit('SET_DATA', { data })
    },
    [GET_ITEM]: async function (context, payload) {
        const { data } = await this.$axios.get(`${API}/${payload.id}`)
        return data
    },
    [COUNT_ITEMS]: async function ({ commit }, payload={}) {
		const { data } = await this.$axios.get(`${API}/count`, { params: payload })
		commit(SET_COUNT, data)
        return data
    },
    [CREATE_ITEM]: async function ({ commit, dispatch, state }, payload) {
		let params = Object.entries({ ...state.criteria, ...payload })
		const formData = new FormData()
		//fix, sails skipper require file param LAST
		params.sort(([keyA, valueA], [keyB, valueB]) => valueB instanceof File ? -1 : 1)
		params.forEach(([key, value]) => formData.set(key, value instanceof Date ? value.valueOf() : value))
		const { data } = await this.$axios.post(API, formData)
		await dispatch(GET_ITEMS)
        return data
    },
    [EDIT_ITEM]: async function ({ dispatch }, payload) {
		let { id, ...params } = payload
		params = Object.entries(params)
		params.sort(([keyA, valueA], [keyB, valueB]) => valueB instanceof File ? -1 : 1)
		const formData = new FormData()
		params.forEach(([key, value]) => formData.set(key, value instanceof Date ? value.valueOf() : value))
		const { data } = await this.$axios.patch(`${API}/${id}`, formData)
		await dispatch(GET_ITEMS)
        return data
    },
    [DESTROY_ITEMS_BY_ID]: async function ({ dispatch }, payload) {
        const { ids } = payload
		const { data } = await this.$axios.post(`${API}/destroyByIds`, { ids })
		await dispatch(GET_ITEMS)
		return data
	},
	[SET_PAGE]: async function ({ dispatch, commit }, { page }) {
		commit(SET_PAGE_MUTATION, { page })
		await dispatch(GET_ITEMS)
	},
	[NEXTPAGE]: async function ({ dispatch, commit }) {
		commit(SET_NEXTPAGE)
		return await dispatch(GET_ITEMS)
	},
	[UPDATE_CRITERIA]: function ({ dispatch, commit }, criteria) {
		commit(SET_CRITERIA, { criteria })
	}
})