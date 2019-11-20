<template>
    <div>        
        <at-input v-show="type!='file'" :value="value" @input="onInput" ref="input" :type="type" :placeholder="placeholder" :disabled="disabled" :status="status"></at-input>
        <span class="link-for-input-file" v-if="type=='file'" ref="span" @click="changeFile">Выбрать файл</span>
    </div>    
</template>

<script>
    export default {
        name: 'at-input-custom',
        props: ['value', 'required', 'placeholder', 'disabled', 'status', 'type'],
        mounted() {
            this.applyRequired()
        },
        watch: {
            required(value) {
                this.applyRequired(value)
            }
        },
        methods: {
            applyRequired(value = this.required) {                
                const input = this.$refs.input.$el.querySelector('input')
                if (value) {
                    input.setAttribute('required', 'required')
                } else {
                    input.removeAttribute('required')
                }
                return this.required
            },
            onInput(value) {
                this.$emit('input', value)
            },
            changeFile(){              
               const self =this 
               const input = self.$refs.input.$el.querySelector('input')                                       
               input.onchange = function (){
                    self.$emit('input', input.files[0])
                    self.$refs.span.innerHTML=input.value
               }
               input.click()
            }
        }
    }
</script>

<style scoped>
    span.link-for-input-file{
        cursor: pointer
    }
</style>
