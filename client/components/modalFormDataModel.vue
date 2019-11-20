<template>
    <at-modal :value="value" :show-close="false" :mask-closable="false" @on-cancel="onCancel">
        <div slot="header">
            {{ title }}
        </div>
        <form ref="form" @submit.prevent="onConfirm">
            <div class="row at-row" v-for="field in schemaFiltered" :key="field.key">
                <div class="col-md-8 col-sm-8 col-xs-24">
                    <label>{{ field.title }}</label>
                </div>
                <div class="col-md-16 col-sm-16 col-xs-24">
                    <input-component v-if="field.type !== 'file' || uploadReady" :ref="field.key" :field="field" :model="model" v-model="model[field.key]" />
                </div>
            </div>
        </form>
        <div slot="footer">
            <at-button type="primary" @click="onConfirm">Сохранить</at-button>
            <at-button @click="onCancel">Отменить</at-button>            
        </div>
    </at-modal>
</template>

<script>
    import AtInputCustom from '~/components/atInputCustom.vue'
    import inputComponent from '~/components/inputComponent'

    export default {
        props: ['schema', 'data', 'value', 'title'],
        watch: {
            value(v) {
                if (v) {
                    try {
                        const input = this.$refs[this.schema.filter(s => !s.hidden)[0].key][0].$el.querySelector('input')
                        input.focus()
                    } catch (error) {
                        console.error(error)
                    }
                } else {
                    this.model = { ...this.defaultModel }
                }
            },
            data(v) {
                this.uploadReady = false
                this.$nextTick(() => {
                    this.uploadReady = true
                    this.model = v ? this.getModel(v) : { ...this.defaultModel }
                })
            },
        },
        data() {
            return {
                model: this.getDefaultModel(),
                defaultModel: this.getDefaultModel(),
                uploadReady: true
            }
        },
        computed: {
            modelEntries() {
                return this.schema
            },
            isCreating() {
                return this.model.id === 0
            },
            schemaFiltered() {
                return this.schema.filter(field => !field.hidden)
            }
        },
        methods: {
            clearForm(){
                this.$refs.form.reset()
            },
            clearInputFileValue(){
                this.$el.querySelectorAll('input[type="file"]').forEach(el=>el.value=null)
                this.$el.querySelectorAll('span.link-for-input-file').forEach(el=>el.innerHTML='Выбрать файл')
            },
            getDefaultModel() {
                return this.schema.reduce((acc, el) => {
                    acc[el.key] = el.default
                    return acc
                }, {})
            },
            getModel(data) {
                return this.schema.reduce((acc, el) => {
                    if (el.type !== 'file') {
                        acc[el.key] = data[el.key]
                    }
                    return acc
                }, {})
            },
            onCancel() {
                this.onClosingModal()

            },
            onClosingModal() {
                this.$emit('input', false)
                this.clearInputFileValue()
            },
            onConfirm() {
                const form = this.$refs.form
                if (!form.checkValidity()) {
                    form.reportValidity()
                } else {
                    this.$emit('submit', this.model)
                    this.onClosingModal()
                }
            },
        },
        components: {
            AtInputCustom,
            inputComponent
        }
    }
</script>

<style scoped>
    .row {
        margin-bottom: 10px;
    }

    .hidden {
        display: none;
    }
</style>