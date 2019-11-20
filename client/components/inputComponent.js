import Vue from 'vue'
import AtInputCustom from '~/components/atInputCustom.vue'
function dateToString(date) {    
    return `${1900 + date.getYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
}

const inputComponent = Vue.component('input-component', {
    components: {
        AtInputCustom
    },
    props: {
        model: {
            type: Object,
            required: true
        },
        field: {
            type: Object,
            required: true
        },
        value: {}
    },
    watch: {
        value(v) {
            if (this.field.type === 'file' && v) { 
                if(v.size>(1024*1024*300)){
                    this.$Notify.error({
                        message: 'Размер файла не должен превышать 300 МБ'
                    })
                }
            }

            if(this.field.type === 'date' && !(v instanceof Date)){
                this.model[this.field.key]=new Date(v)
            }

            if (this.field.type === 'textarea') { 
                this.$el.innerHTML = v
            }
        }
    },
    render: function (h) {
        if (this.field.type === 'boolean') {
            return h('at-checkbox', {
                props: {
                    value: this.model[this.field.key]
                },
                on: {
                    input: (value) => {
                        this.$emit('input', value)
                    }
                }
            })
        }
        if (this.field.type === 'textarea') {
            
            return h('textarea', {
                props: {
                    value: this.model[this.field.key]
                },
                class: {
                    [`at-input__original`]: true
                },
                on: {
                    input: (event) => {
                        console.log('textarea')
                        this.$emit('input', event.target.value)
                    }
                }
            })
        }
        return h('at-input-custom', {
                props: {
                    value: this.field.type === 'file' ? null : 
                            this.field.type === 'date' ? dateToString(this.model[this.field.key]) : this.model[this.field.key],
                    required: this.field.required,
                    placeholder: this.field.placeholder,
                    type: this.field.type
                },
                on: {
                    input: (event) => {
                        const input = this.$el.querySelector('input')
                        switch (this.field.type) {                                                        
                            case 'file':
                                this.$emit('input', input.files[0])
                                break  
                            case 'date': {  
                                let timestamp = Date.parse(input.value)
                                if (!isNaN(timestamp) && timestamp>0) {
                                    this.$emit('input', input.value)
                                }                                                                                                                      
                            }
                            break                     
                            default:
                                this.$emit('input', input.value)
                        }
                    },
                }

        })
    }
})

export default inputComponent