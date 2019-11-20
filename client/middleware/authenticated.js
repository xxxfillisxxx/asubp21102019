export default function ({ router, store, redirect }) {
    if (!store.getters.isLogged) {
        return redirect('/admin/login?message=true')
    }
}