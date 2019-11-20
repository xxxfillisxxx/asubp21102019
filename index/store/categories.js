export const actions = {
    async getCategories(context, payload) {
        const { data } = await this.$axios.get('/api/v1/category/find', { params: { ...payload } })
        return data
    },
    async getCategory(context, payload) {
        const { data } = await this.$axios.get(`/api/v1/category/${payload.id}`)
        return data
    },
    async createCategory(context, payload) {
        const { data } = await this.$axios.post('/api/v1/category', payload)
        return data
    },
    async editCategory(context, payload) {
        const { id, ...category } = payload
        const { data } = await this.$axios.patch(`/api/v1/category/${id}`, category)
        return data
    },
    async destroyCategoriesByIds(context, payload) {
        const { ids } = payload
        return this.$axios.post('/api/v1/category/destroyByIds', { ids })
    },
    async countCategories(context, payload={}) {
        const { data } = await this.$axios.get('/api/v1/category/count', { params: payload })
        return data
    },
}