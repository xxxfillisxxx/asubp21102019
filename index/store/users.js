export const actions = {
    async addPermission(context, payload) {
        const { data } = await this.$axios.put(`/api/v1/user/${payload.userId}/subsystem/${payload.subsystemId}`)
        return data
    },
    async removePermission(context, payload) {
        const { data } = await this.$axios.delete(`/api/v1/user/${payload.userId}/subsystem/${payload.subsystemId}`)
        return data
    },
    async getUser(context, payload) {
        const { data } = await this.$axios.get(`/api/v1/user/${payload.id}`)
        return data
    },
    async getUsers(context, payload={}) {
        const { data } = await this.$axios.get('/api/v1/user', { params: payload })
        return data
    },
    async countUsers(context, payload={}) {
        const { data } = await this.$axios.get('/api/v1/user/count', { params: payload })
        return data
    },
    async createUser(context, payload) {
        const { data } = await this.$axios.post('/api/v1/user', payload)
        return data
    },
    async editUser(context, payload) {
        const { id, ...user } = payload
        const { data } = await this.$axios.patch(`/api/v1/user/${id}`, user)
        return data
    },
    async destroyUsersByIds(context, payload) {
        const { ids } = payload
        console.log(ids)
        return this.$axios.post('/api/v1/user/destroyByIds', { ids })
    }
}