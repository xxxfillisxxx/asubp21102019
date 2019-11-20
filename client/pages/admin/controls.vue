<template>
  <div>
      <at-breadcrumb separator=">">
            <at-breadcrumb-item :to="{ name: 'admin-subsystems' }">Список подсистем</at-breadcrumb-item>
            
        </at-breadcrumb>
    <h2>Контроли</h2>
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
    import Controls from '@/models/controls'
    import { TableColumnsBuilder } from '@/common/TableColumns'
    import ModalForm from '@/components/modalFormDataModel'
    import EditModal from '@/mixins/editModal'
    import TableSelection from '@/mixins/tableSelection'
    import { mapGetters, mapActions } from 'vuex'
    import { actionNames } from '@/store/default/-actions'

    const converter = new DataModelConverter(Controls, {
        schema: {
            order: ['title', 'description', 'formula'],
            hidden: ['id']
        },
        columns: {
            order: ['id', 'title']
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
            .build()
    }
    const storeName = 'controls'

    const emptyControl = {
        id: 0,
        title: '',
        formula: '',

    
    }
    export default {
        
        layout: 'admin',
        async fetch({ store, params }) {
            await store.dispatch(`${storeName}/${actionNames.GET_ITEMS}`)
            
            
        },

        computed: {
            ...mapGetters({
                 data: `${storeName}/data`,
                count: `${storeName}/count`
                

            })
        },
        
        
        data() {
            return {
                
                columns: makeColumns.call(this, converter),
                schema: converter.toSchema(),
                selectionParent:[],
                modalTitles: {
                    create: 'Создание контроля',
                    edit: 'Изменение контроля'
                },
                title: 'Контроли'
                    
                
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

            },
            async onChange() {
                const ids = this.selection.map(item => item.id) 
                 this.editDataModal({ ...this.selection[0] })              
            }
        },
        
            
        components: {
            KsuiTable,
            ModalForm
        },
        mixins: [EditModal, TableSelection]
    }
    
    
</script>
