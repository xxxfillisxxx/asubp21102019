import { getDefaultState } from '@/store/default/-state'
import { getDefaultMutations } from '@/store/default/-mutations'
import { getDefaultActions, actionNames } from '@/store/default/-actions'

const API = '/api/v1/subsystem'

const acts = getDefaultActions(API)

export const state = () => getDefaultState()
export const mutations = getDefaultMutations()
export const actions = { ...acts,
	[actionNames.CREATE_ITEM]: async function ({ commit, dispatch, state, rootState }, payload) {
		let params = Object.entries({ ...state.criteria, ...payload })
		const formData = new FormData()
		//fix, sails skipper require file param LAST
		params.sort(([keyA, valueA], [keyB, valueB]) => valueB instanceof File ? -1 : 1)
		params.forEach(([key, value]) => formData.set(key, value instanceof Date ? value.valueOf() : value))
		const { data} = await this.$axios.post(API, formData)
		.then(({ data: subsystem }) => {
			const faq = new FormData()
			faq.append('title', 'Заголовок FAQ')
			faq.append('body', '')
			faq.append('subsystem', subsystem.id)
			return this.$axios.post('/api/v1/faq', faq)
		})
		.then(({data: faq}) => {
			return this.$axios.patch(`${API}/${faq.subsystem.id}`, {"faq": faq.id, "orderField":1 })
		})
		await dispatch(actionNames.GET_ITEMS)
        return data
	},
	[actionNames.DESTROY_ITEMS_BY_ID]: async function ({ dispatch }, payload) {
		const { ids, faqs } = payload
		const { data } = await this.$axios.post(`${API}/destroyByIds`, { ids })
		await this.$axios.post(`/api/v1/faq/destroyByIds`, { faqs })
		await dispatch(actionNames.GET_ITEMS)
		return data
    },
    [actionNames.GET_ITEMS_FRONTEND]: async function ({ commit, dispatch, state }) {

		const payload = { ...state.pagination, ...state.criteria}

		const [ { data } ] = await Promise.all([
            this.$axios.get(`${API}/getFrontend`, { params: payload }),            
			dispatch(actionNames.COUNT_ITEMS, state.criteria)
		])

		commit('SET_DATA', { data })
    },
}

export const getters = {
	data: state => state.data.map(data => ({
		...data,
	})),
	count: state => state.count
}