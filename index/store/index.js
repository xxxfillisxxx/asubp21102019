export const state = () => ({
    user: null
})
export const mutations = {
    setUser (state, payload) {
        state.user = payload
    }
}
export const actions = {
    nuxtServerInit ({ commit }, { req }) {
        console.log(req.session)
        if (req.session.user) {
            commit('setUser', req.session.user)
        }
    },
    async logout ({ commit }) {
        await this.$axios.get('api/v1/user/logout')
        this.app.router.push('/admin/login')
        commit('setUser', null)
    },
    async login ({ commit }, payload) {
        const { data } = await this.$axios.post('api/v1/user/login', payload)
        const { user } = data
        commit('setUser', user)
        return user
    }
}

export const getters = {
    isLogged(state) {
        return !!state.user
    },
    isAdmin(state) {
        return !!state.user && state.user.isAdmin
    }
}                                               