<template>
    <div>
        <at-breadcrumb separator=">">
            <at-breadcrumb-item>Список подсистем</at-breadcrumb-item>
        </at-breadcrumb>
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
            <at-button
                type="warning"
                :disabled="emptySelection || !$store.getters.isAdmin || selection.length!=1"
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
    import Subsystem from '@/models/subsystem'
    import { TableColumnsBuilder } from '@/common/TableColumns'
    import ModalForm from '@/components/modalFormDataModel'
    import EditModal from '@/mixins/editModal'
    import TableSelection from '@/mixins/tableSelection'

    import { mapGetters, mapActions } from 'vuex'
    import { actionNames } from '@/store/default/-actions'

    const converter = new DataModelConverter(Subsystem, {
        schema: {
            order: ['name', 'description', 'orderField'],
            hidden: ['id']
        },
        columns: {
            order: ['orderField', 'name', 'description']
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
                    console.log(params.item)
                    this.editDataModal({ ...params.item })
                }                
            })*/
            .addOperation({
                title: 'Категории',
                onClick: (params) => {
                    this.$router.push(`categories/${params.item.id}`)
                }
            })
            .addOperation({
                title: 'Дистрибутивы',
                onClick: (params) => {
                    this.$router.push(`distributives/${params.item.id}`)
                }
            })
            .addOperation({
                title: 'FAQ',
                onClick: (params) => {
                    this.$router.push(`faq/${params.item.faq.id||params.item.faq}`)
                }
            })
            .addOperation({
                title: 'Контакты',
                onClick: (params) => {
                    this.$router.push(`contacts/${params.item.id}`)
                }
            })
            .build()
    }

    const storeName = 'subsystems'

    export default {
        async fetch({ store }) {
            await store.dispatch(`${storeName}/${actionNames.GET_ITEMS}`)
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
                    create: 'Создание подсистемы',
                    edit: 'Изменение подсистемы'
                },
                title: 'Подсистемы'
            }
        },
        methods: {
            ...mapActions(storeName, {
                create:  actionNames.CREATE_ITEM,
                update: actionNames.EDIT_ITEM,
                deleteItems: actionNames.DESTROY_ITEMS_BY_ID,
                setPage: actionNames.SET_PAGE
            }),
            async onPageChange(page) {
                await this.setPage({ page })
            },
            async onDelete() {
                const ids = this.selection.map(item => item.id)
                const faqs = this.selection.map(item => item.faq.id)
                await this.deleteItems({ ids, faqs })
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
