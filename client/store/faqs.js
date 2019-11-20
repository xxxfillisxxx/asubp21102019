import { getDefaultState } from '@/store/default/-state'
import { getDefaultMutations } from '@/store/default/-mutations'
import { getDefaultActions, actionNames } from '@/store/default/-actions'

const API = '/api/v1/faq'

const acts = getDefaultActions(API)

export const state = () => getDefaultState()
export const mutations = getDefaultMutations()
export const actions = { ...acts,
    [actionNames.EDIT_ITEM]: async function (context, payload) {
        let { id, ...params } = payload
		params = Object.entries(params)
		params.sort(([keyA, valueA], [keyB, valueB]) => valueB instanceof File ? -1 : 1)
		const formData = new FormData()
		params.forEach(([key, value]) => formData.set(key, value instanceof Date ? value.valueOf() : value))
		const { data } = await this.$axios.patch(`${API}/${id}`, formData)
        return data
    }
}

export const getters = {
	data: state => state.data.map(data => ({
        ...data,
	})),
	count: state => state.count
}