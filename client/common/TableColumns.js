import Vue from 'vue'
import { DataModelConverter } from '@/common/DataModel'
import CreateEditButtons from '@/common/editButtons'

export const idColumn = {
    title: '#',
    key: 'id'
}

export const createdAtColumn = {
    title: 'Создан',
    render: (h, params) => Vue.prototype._v((new Date(params.item.createdAt)).toLocaleString())
}

export const updatedAtColumn = {
    title: 'Обновлен',
    render: (h, params) => Vue.prototype._v((new Date(params.item.updatedAt)).toLocaleString())
}

export const generateDateColumn = ({ title, key }) => ({ title, render: (h, params) => Vue.prototype._v((new Date(params.item[key])).toLocaleString()) })

class TableColumnsBuilder {
    columns = []
    operations = []

    constructor(options) {
        this.options = options
    }

    addColumn(column) {
        this.columns.push(column)
        return this
    }

    addColumns(columns) {
        columns.forEach(col => {
            this.addColumn(col)
        })
        return this
    }

    addColumnsFromDataModelConverter(dataModelConverter, filters) {
        let columns = dataModelConverter.toColumns().filter(col => col.key !== 'id')
        if (filters) {
            filters.forEach(filter => columns = columns.filter((item, index, arr) => !filter(item, index, arr)))
        }
        this.addColumns(columns)
        
        return this
    }

    addOperation(operation) {
        this.operations.push(operation)
        return this
    }

    build() {
        const columns = []

        if (this.options.withId) {
            columns.push(idColumn)
        }

        this.columns.forEach(col => columns.push(col))

        if (this.options.withCreatedAt) {
            columns.push(createdAtColumn)
        }

        if (this.options.withUpdatedAt) {
            columns.push(updatedAtColumn)
        }

        columns.push({
            title: 'Операции',
            render: CreateEditButtons.apply(null, this.operations)
        })

        return columns
     }

}

export { TableColumnsBuilder }
