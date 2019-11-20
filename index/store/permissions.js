export const actions = {
    async getPermissionsByUser(context, payload) {
        const { data } = await this.$axios.get(`/api/v1/permission/find?user=${payload.id}`)
        console.log(data)
        return data
    }
}