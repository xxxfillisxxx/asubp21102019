export default function ({ store, redirect }) {
    if (!store.getters.isAdmin && store.getters.isLogged) {
        return store.dispatch('logout')
    }
}