// export const actions = {
//     async getNewsDataBySource(context, payload) {
//         const { data } = await this.$axios.get(`/api/v1/news/source/${payload.name}`, payload)
//         return data.news
//     },
//     async getSourceList() {
//         const { data } = await this.$axios.get(`/api/v1/news/sources`)
//         return data
//     },
//     async getNews(context, payload) {
//         const { data } = await this.$axios.get(`/api/v1/news`, payload)
//         return data
//     },
//     async createNew(context, payload) {
//         const { data } = await this.$axios.post('/api/v1/news', payload)
//         return data
//     },
//     async editNew(context, payload) {
//         const { id, ..._new } = payload
//         const { data } = await this.$axios.patch(`/api/v1/news/${id}`, _new)
//         return data
//     },
//     async destroyNewsByIds(context, payload) {
//         const { ids } = payload
//         return this.$axios.post('/api/v1/news/destroyByIds', { ids })
//     }
// }

import { getDefaultState } from '@/store/default/-state'
import { getDefaultMutations } from '@/store/default/-mutations'
import { getDefaultActions } from '@/store/default/-actions'

const API = '/api/v1/news'

const acts = getDefaultActions(API)

export const state = () => getDefaultState()
export const mutations = getDefaultMutations()
export const actions = { ...acts, ...{
    async getNewsDataBySource(context, payload) {
        const { data } = await this.$axios.get(`${API}/source/${payload.name}`, payload)
        return data.news
    },
    async getSourceList() {
        const { data } = await this.$axios.get(`${API}/sources`)
        return data
    }
} }

export const getters = {
	data: state => state.data.map(data => ({
		...data,
	})),
	count: state => state.count
}