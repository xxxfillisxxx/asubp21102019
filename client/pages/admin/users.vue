<template>
    <div>
        <h2>Пользователи</h2>
        <div class="table-buttons">
            <at-button type="primary" @click="createDataModal" v-if="$store.getters.isAdmin">Создать</at-button>
            <at-button type="error" :disabled="emptySelection" @click="deleteUsers" v-if="$store.getters.isAdmin">Удалить</at-button>
        </div>
        <div>
            <at-table ref="table" :columns="columns" :data="users" stripe ></at-table>
            <table-footer :count="count" @page-change="onPageChange"></table-footer>
        </div>
        <modal-form :schema="editUserForForm" v-model="editModal" :title="editUserModalTitle" @submit="submitUser" />
    </div>
</template>

<script>
    import axios from 'axios'

    import editButtons from '~/common/editButtons'
    import baseTableColumns, { Selection } from '~/common/baseTableColumns'
    import datetimeToStringMap from '~/common/datetimeToStringMap'
    import { pageSize, sort, onPageChange, clearSelection, paginationMixin } from '~/common/tablePagination'

    import UserForm from '~/components/userForm'
    import ModalForm from '~/components/modalForm.vue'
    import TableFooter from '~/components/tableFooter.vue'

    import EditModalMixin from '~/mixins/editModal.vue'
    import TableSelectionMixin from '~/mixins/tableSelection.vue'

    import { mapActions } from 'vuex'

    const emptyUser = {
        id: 0,
        login: '',
        password: '',
        isAdmin: false,
        isFO: false,
    }
    
    export default {
        layout: 'admin',
        mixins: [EditModalMixin, TableSelectionMixin, paginationMixin],
        middleware: ['authenticated'],
        async asyncData({ app, store }) {
            try {
                const [usersData, { count }] = await Promise.all([
                    store.dispatch('users/getUsersEdit', { limit: pageSize, sort }),
                    store.dispatch('users/countUsers'),                 
                ])
                return { usersData, count }
            } catch (err) {
                console.log(err)
            }
        },
        created() {
            this.onPageChange = onPageChange(this.getUsers, 'usersData', pageSize, sort).bind(this);
        },
        computed: {
            users() { 
                return this.usersData
            },
            editUserModalTitle () { return this.editData ? 'Изменение пользователя' : 'Создание пользователя' },
            editUserForForm () {
                const m = !this.isCreating ? this.editData : emptyUser
                const schema = [
                    {
                        key: 'id',
                        value: m.id,
                        hidden: true
                    },
                    {
                        title: 'Логин',
                        key: 'login',
                        value: m.login,
                        required: true
                    },
                    {
                        title: 'Пароль',
                        key: 'password',
                        value: m.password,
                        type: 'password',
                        required: m.id === 0
                    },
                    {
                        title: 'Администратор',
                        key: 'isAdmin',
                        value: m.isAdmin,
                        type:'boolean',
                        hidden: !this.$store.getters.isAdmin
                    },
                    {
                        title: 'Финорган',
                        key: 'isFO',
                        value: m.isFO,
                        type:'boolean',
                        
                    }
                ]
                return schema

            }
        },
        data() {
            return {
                columns: [
                    Selection.call(this),
                    baseTableColumns[0],
                    {
                        title: 'Логин',
                        key: 'login'
                    },
                    ...baseTableColumns.slice(1),
                    {
                        title: 'Операции',
                        render: editButtons(
                            {
                                title: 'Изменить',
                                onClick: (params) => {
                                    this.editDataModal(Object.entries(params.item).reduce((acc, [key, value]) => {
                                        if (key !== 'index') {
                                            acc[key] = value
                                        }
                                        return acc
                                    }, {}))
                                },
                                disable: (params) => false
                            },
                            {
                                title: 'Разрешения',
                                onClick: (params) => {
                                    this.$router.push(`permissions/${params.item.id}`)                                    
                                },
                                disable: (params) => (params.item.isAdmin || !this.$store.getters.isAdmin)
                            }
                        )
                    }
                ],
            }
        },
        methods: {
            ...mapActions('users', [
                'getUsers',
                'countUsers',
                'createUser',
                'editUser',
                'destroyUsersByIds',
                'getUsersEdit'
            ]),            
            async submitUser(user) {
                const { login, password, isAdmin, id } = user
                if (id === 0) {
                    const newUser = await this.createUser({ login, password, isAdmin }) 
                    this.update()
                    this.$Notify({
                        type: 'success',
                        title: `Создание пользователя ${login}`,
                        message: 'Пользователь успешно создан'
                    })
                } else {
                    const params = { login, id }
                    if(this.$store.getters.isAdmin){
                        params.isAdmin = isAdmin
                    }                  
                    if (password) {
                        params.password = password
                    }
                    const editedUser = await this.editUser(params)
                    const index = this.usersData.findIndex((user) => user.id === editedUser.id)
                    this.usersData.splice(index, 1, editedUser)
                    this.$Notify({
                        type: 'success',
                        title: `Изменение пользователя ${login}`,
                        message: 'Пользователь успешно изменен'
                    })
                }
                
                
                this.closeEditModal()
                this.clearFormData()
            },
            async deleteUsers() {
                await this.destroyUsersByIds({ ids: this.selection.map(user => user.id) })
                this.update()
            },

        },
        components: {
            ModalForm,
            TableFooter
        }
    }  
</script>
