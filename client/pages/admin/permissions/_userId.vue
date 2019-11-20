<template>
    <div>
        <h2>Разрешения</h2>
        <h4>Пользователь: {{ user.login }}</h4>
        <div class="row at-row">
            <div class="col-md-10">
                <h4>Все подсистемы</h4>
                <div class="list-container" >
                    <ul class="list-group" ref="allSubsystemsContainer">
                        <li class="list-group-item" :data-id="subsystem.id" v-for="subsystem in subsystemsWoPermitted" :key="subsystem.id">
                            {{ subsystem.name }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-10 col-md-offset-4">
                <h4>Разрешенные подсистемы</h4>
                <div class="list-container" >
                    <ul class="list-group" ref="permittedSubsystemsContainer">
                        <li class="list-group-item" :data-id="subsystem.id" v-for="subsystem in user.permittedSubsystems" :key="subsystem.id">
                            {{ subsystem.name }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { actionNames } from '@/store/default/-actions'
    import Sortable from 'sortablejs' 
    export default {
        layout: 'admin',
        async asyncData({ app, store, params }) {
            console.log(params)
            const user = await store.dispatch('users/getUser', {id: params.userId})
            await store.dispatch(`subsystems/${actionNames.GET_ITEMS}`)
            return {
                user
            }
        },
        mounted() {
            const all = this.$refs.allSubsystemsContainer
            const permitted = this.$refs.permittedSubsystemsContainer

            const sb1 = this.subsystemsWoPermitted
            const sb = this.subsystems
            const sb2 = this.user.permittedSubsystems
            const vm = this

            const sortable1 = Sortable.create(all, { group: 'main', sort: false,
                onAdd: (evt) => {
                    this.$forceUpdate()
                },
                onRemove: (evt) => {
                    this.$forceUpdate()
                }
            })
            const sortable2 = Sortable.create(permitted, { group: 'main', sort: false, 
                onAdd: async (evt) => {
                    const subsystemId = evt.item.getAttribute('data-id')
                    const subsystem = sb.find((s) => s.id === +subsystemId)
                    await this.$store.dispatch('users/addPermission', { userId: this.user.id, subsystemId })
                    this.$Notify({title: 'Разрешение успешно добавлено'})
                    this.user.permittedSubsystems.push(subsystem)
                    this.$forceUpdate()
                },
                onRemove: async (evt) => {
                    const subsystemId = evt.item.getAttribute('data-id')
                    const subsystem = sb.find((s) => s.id === +subsystemId)
                    const index = this.user.permittedSubsystems.findIndex((s) => s.id === +subsystemId)
                    await this.$store.dispatch('users/removePermission', { userId: this.user.id, subsystemId })
                    this.user.permittedSubsystems.splice(index, 1)
                    this.$forceUpdate()
                }
            })

            
        },
        computed: {
            ...mapGetters({
                subsystems: `subsystems/data`
            }),
            subsystemsWoPermitted() {
                return this.subsystems.filter(sb => !this.user.permittedSubsystems.find(s => s.id === sb.id)).sort((a, b) => a.orderField - b.orderField)
            },
            permittedSubsystems() {
                return this.user.permittedSubsystems.sort((a, b) => a.orderField - b.orderField)
            }
        }
    }
</script>

<style scoped>

    .list-container {
        min-height: 500px;
        background: #e9e9e9;
        height: 100%;
    }

    .list-group {
        padding-left: 0;
        margin-bottom: 20px;
        min-height: 20px;
        height: 100%;
    }

    .list-group-item {
        position: relative;
        display: block;
        padding: 10px 15px;
        margin-bottom: -1px;
        background-color: #fff;
        border: 1px solid #ddd;
    }

    .list-group-item:hover {
        cursor: move;
    }

    .list-group-item:first-child{
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }
</style>
