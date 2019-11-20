import Vue from 'vue'
export default [
    {
        title: '#',
        key: 'id'
    },
    {
        title: 'Создан',
        // key: 'createdAt',
        render: (h, params) => Vue.prototype._v((new Date(params.item.createdAt)).toLocaleString())
    },
    {
        title: 'Обновлен',
        // key: 'updatedAt',
        render: (h, params) => Vue.prototype._v((new Date(params.item.updatedAt)).toLocaleString())
    }
]

export const Selection = function () {
    return { 
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
    }
}