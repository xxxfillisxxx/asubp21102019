<template>
    <div>
        <h2>{{ title }}</h2>
        <div class="table-buttons">
            <at-button 
                type="primary"
                @click="createDataModal"
                :disabled="!$store.getters.isAdmin"
            >
                Создать
            </at-button>
            <at-button 
                type="error" 
                :disabled="emptySelection || !$store.getters.isAdmin" 
                @click="onDelete"
            >
                Удалить
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
    import News from '@/models/news'
    import { TableColumnsBuilder } from '@/common/TableColumns'
    import ModalForm from '@/components/modalFormDataModel'
    import EditModal from '@/mixins/editModal'
    import TableSelection from '@/mixins/tableSelection'

    import { mapGetters, mapActions } from 'vuex'
    import { actionNames } from '@/store/default/-actions'

    const converter = new DataModelConverter(News, {
        schema: {
            order: ['name', 'title', 'url', 'withProxy', 'orderField'],
            hidden: ['id']
        },
        columns: {
            order: ['orderField', 'name', 'title', 'url', 'withProxy']
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
            .addOperation({
                title: 'Изменить',
                onClick: (params) => {
                    this.editDataModal({ ...params.item })
                }
            })
            .build()
    }

    const storeName = 'news'

    export default {
        async fetch({ store }) {
            try {
                await store.dispatch(`${storeName}/${actionNames.GET_ITEMS}`)
            } catch (error) {
                console.error(error)
            }
        },
        computed: {
            ...mapGetters({
                data: `${storeName}/data`,
                count: `${storeName}/count`
            })
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
                    create: 'Создание источника новостей',
                    edit: 'Изменение источника новостей'
                },
                title: 'Источники новостей'
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
