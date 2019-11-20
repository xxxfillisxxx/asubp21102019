class DataModel {

}

class DataModelConverter {

    _types = {
        [Number]: 'number',
        [String]: 'text',
        [Boolean]: 'boolean',
        [Date]: 'date',
        [File]: 'file'
    }

    _sortByField = (arr, ordering) => {
        arr.sort(([a], [b]) => { 
            return ordering.findIndex(el => el === a) - ordering.findIndex(el => el === b) 
        })
    }
         
    constructor(dm, options) {
        this.dm = dm
        this.options = options
    }

    toColumns() {
        const entries = Object.entries(this.dm.prototype.schema)
        if (this.options.columns) {
            if (this.options.columns.order) {
                this._sortByField(entries, this.options.columns.order)
            }
        }
        return entries.map(([key, value]) => {
            return {
                title: value.title,
                key
            }
        })
    }

    toSchema() {
        const entries = Object.entries(this.dm.prototype.schema)

        if (this.options.schema) {
            if (this.options.schema.order) {
                this._sortByField(entries, this.options.schema.order)
            }
        }
        
        return entries.map(([key, value]) => {

            const entry = {
                title: value.title,
                key,
                type: this._types[value.type],
                default: value.default
            }
            entry.hidden = (this.options.schema && this.options.schema.hidden) ? 
                this.options.schema.hidden.includes(key) : 
                false
            return entry
        })
    }

}

export { DataModel, DataModelConverter }