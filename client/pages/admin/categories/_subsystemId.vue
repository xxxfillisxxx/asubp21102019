<template>
    <div>
        <at-breadcrumb separator=">">
            <at-breadcrumb-item :to="{ name: 'admin-subsystems' }">Список подсистем</at-breadcrumb-item>
            <at-breadcrumb-item>Категории {{ subsystem.name }}</at-breadcrumb-item>
        </at-breadcrumb>
        <h2>{{ title }}</h2>
        <div class="table-buttons">
            <at-button
                type="primary"
                @click="createDataModal"
            >
                Создать
            </at-button>
            <at-button
                type="error"
                :disabled="emptySelection"
                @click="onDelete"
            >
                Удалить
            </at-button>
            <at-button
                type="warning"
                :disabled="emptySelection || selection.length!=1"
                @click="onChange"
            >
                Изменить
            </at-button>
        </div>
        <ksui-table
            :columns="columns"
            :data="data"
            :selectionParent="selectionParent"
            pagination
            optional
            :count="count"
            @selection="onSelectionChange"
            @pageChange="onPageChange"
        />
        <modal-form
            :schema="schema"
            v-model="editModal"
            :title="modalTitle"
            :data="editData"
            @submit="onSubmit"
        />
    </div>
</template>

<script>
    import KsuiTable from '@/components/ksuiTable'
    import { DataModelConverter, DataModelFactory } from '@/common/DataModel'
    import Category from '@/models/category'
    import { TableColumnsBuilder } from '@/common/TableColumns'
    import ModalForm from '@/components/modalFormDataModel'
    import EditModal from '@/mixins/editModal'
    import TableSelection from '@/mixins/tableSelection'

    import { mapGetters, mapActions } from 'vuex'
    import { actionNames } from '@/store/default/-actions'

    const converter = new DataModelConverter(Category, {
        schema: {
            order: ['name', 'orderField'],
            hidden: ['id']
        },
        columns: {
            order: ['orderField', 'name']
        }
    })

    function makeColumns(converter) {
        const tableColumnsBuilder = new TableColumnsBuilder({
            withId: true,
            withCreatedAt: true,
            withUpdatedAt: true
        })

        return tableColumnsBuilder
            .addColumnsFromDataModelConverter(converter)
            /*.addOperation({
                title: 'Изменить',
                onClick: (params) => {
                    this.editDataModal({ ...params.item })
                }
            })*/
            .addOperation({
                title: 'Документы',
                onClick: (params) => {
                    this.$router.push(`/admin/documents/${params.item.id}`)
                }
            })
            .build()
    }

    const storeName = 'categories'

    export default {
        async asyncData({store, params}) {
            const subsystem = await store.dispatch(`subsystems/${actionNames.GET_ITEM}`, { id: params.subsystemId })
            return { subsystem }
        },
        async fetch({ store, params }) {
            const subsystem = Number.parseInt(params.subsystemId)
            store.dispatch(`${storeName}/${actionNames.UPDATE_CRITERIA}`, { subsystem })
            await store.dispatch(`${storeName}/${actionNames.GET_ITEMS}`)
        },
        computed: {
            ...mapGetters({
                data: `${storeName}/data`,
                count: `${storeName}/count`
            }),
            title() {
                return `Категории подсистемы ${this.subsystem.name}`
            }
        },
        layout: 'admin',
        components: {
            KsuiTable,
            ModalForm
        },
        mixins: [EditModal, TableSelection],
        data() {
            return {
                columns: makeColumns.call(this, converter),
                schema: converter.toSchema(),
                selectionParent:[],
                modalTitles: {
                    create: 'Создание категории',
                    edit: 'Изменение категории'
                },
            }
        },
        methods: {
            ...mapActions(storeName, {
                create: actionNames.CREATE_ITEM,
                update: actionNames.EDIT_ITEM,
                deleteItems: actionNames.DESTROY_ITEMS_BY_ID,
                setPage: actionNames.SET_PAGE
            }),
            async onPageChange(page) {
                await this.setPage({ page })
            },
            async onDelete() {
                const ids = this.selection.map(item => item.id)
                await this.deleteItems({ ids })
                this.selection = []
            },
            async onChange() {
                const ids = this.selection.map(item => item.id) 
                 this.editDataModal({ ...this.selection[0] })              
            },
            async onSubmit(data) {
                const isNew = !data.id

                if (isNew) {
                    const { id, ...params } = data
                    await this.create(params)
                } else {
                    await this.update(data)
                }
                this.selectionParent=[]

            }
        }

    }

</script>
