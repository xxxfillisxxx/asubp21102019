import { getDefaultState } from '@/store/default/-state'
import { getDefaultMutations } from '@/store/default/-mutations'
import { getDefaultActions } from '@/store/default/-actions'

const API = '/api/v1/distributive'

const acts = getDefaultActions(API)

export const state = () => getDefaultState()
export const mutations = getDefaultMutations()
export const actions = { ...acts }

export const getters = {
	data: state => state.data.map(data => ({
		...data,
	})),
	count: state => state.count
}