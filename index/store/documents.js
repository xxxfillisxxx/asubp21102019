export const actions = {
    async getDocuments(context, payload) {
        const { data } = await this.$axios.get('/api/v1/document/find', { params: { category: payload.categoryId, sort: payload.sort, limit: payload.limit } })
        return data
    },
    async createDocument(context, payload) {
        const formData = new FormData()
        Object.entries(payload).forEach(([key, value]) => {
            formData.append(key, value)
        })
        const { data } = await this.$axios.post('/api/v1/document', formData)
        return data
    },
    async countDocuments(context, payload = {}) {
        const { data } = await this.$axios.get('/api/v1/document/count', { params: payload })
        return data
    }
}