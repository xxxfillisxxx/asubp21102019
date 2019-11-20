export const actions = {
    async getSubsystems(context, payload={}) {
        const { data } = await this.$axios.get('/api/v1/subsystem', { params: payload })
        return data
    },
    async getSubsystem(context, payload) {
        const { data } = await this.$axios.get(`/api/v1/subsystem/${payload.id}`)
        return data
    },
    async countSubsystems(context, payload={}) {
        const { data } = await this.$axios.get('/api/v1/subsystem/count', { params: payload })
        return data
    },
    async createSubsystem(context, payload) {
        const { data } = await this.$axios.post('/api/v1/subsystem', payload)
        return data
    },
    async editSubsystem(context, payload) {
        const { id, ...subsystem } = payload
        const { data } = await this.$axios.patch(`/api/v1/subsystem/${id}`, subsystem)
        return data
    },
    async destroySubsystemsByIds(context, payload) {
        const { ids } = payload
        return this.$axios.post('/api/v1/subsystem/destroyByIds', { ids })
    }
}