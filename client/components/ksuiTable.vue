<template>
    <div>
        <at-table :columns="cols" :data="data" />
        <table-footer v-if="pagination" :count="count" @page-change="onPageChange"></table-footer>
    </div>
</template>

<script>
import TableFooter from '@/components/tableFooter'

export default {
    name: 'ksui-table',
    components: {
        TableFooter
    },
    props: {
        pagination: {
            type: Boolean,
            default: false
        },
        count: {
            type: Number,
            validator: Number.isInteger
        },
        optional: {
            type: Boolean
        },
        columns: {
            type: Array,
        },
        data: {
            type: Array,
        },
        selectionParent: {
            type: Array
        }
    },
    data() {
        return {
            cols: [
                { 
                    render: (h, params) => h('at-checkbox', 
                        { 
                            props: {
                                value: this.selection.findIndex(s => s.id === params.item.id) !== -1
                            },
                            on: { 
                                input: (x) => { 
                                    x ? 
                                        this.selection.push(params.item) : 
                                        this.selection.splice(this.selection.findIndex((s) => s.id === params.item.id), 1)
                                }
                            } 
                        }
                    )
                },
                ...this.columns
            ],
            selection: []
        }
    },
    methods: {
        onPageChange(pageNumber) {
            this.$emit('pageChange', pageNumber)
        },
    },
    computed: {
        emptySelection() {
            return this.selection.length === 0
        }
    },
    watch: {
        selectionParent(items){
            this.selection=items
        },
        selection(items) {
            this.$emit('selection', items)
        }
    }

}
</script>