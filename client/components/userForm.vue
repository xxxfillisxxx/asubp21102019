<template>
    <at-modal :value="value" @on-cancel="onCancel">
        <div slot="header">
            {{ title }}
        </div>
        <form ref="userForm" @submit.prevent="onConfirm">
            <div class="row at-row">
                <div class="col-md-8">
                    <label>Логин</label>
                </div>
                <div class="col-md-16">
                    <at-input-custom v-model="userData.login" required="true"></at-input-custom>
                </div>
            </div>
            <div class="row at-row">
                <div class="col-md-8">
                    <label>Пароль</label>
                </div>
                <div class="col-md-16">
                    <at-input-custom 
                        v-model="userData.password" 
                        :required="creating" 
                        :placeholder="!creating ? 'Введите новый пароль' : null"
                    ></at-input-custom>
                </div>
            </div>
            <div class="row at-row">
                <div class="col-md-8">
                    <label for="userIsAdmin">Администратор</label>
                </div>
                <div class="col-md-16">
                    <at-checkbox v-model="userData.isAdmin"></at-checkbox>
                </div>
            </div>
            <div class="row at-row">
                <div class="col-md-8">
                    <label for="userIsFO">Финорган</label>
                </div>
                <div class="col-md-16">
                    <at-checkbox v-model="userData.isFO"></at-checkbox>
                </div>
            </div>
        </form>
        <div slot="footer">
            <at-button @click="onCancel">Отменить</at-button>
            <at-button type="primary" @click="onConfirm">Отправить</at-button>
        </div>
    </at-modal>
</template>

<script>
    const empty = {
        id: 0,
        login: '',
        isAdmin: false,
    }
    import AtInputCustom from '~/components/atInputCustom.vue'
    export default {
        props: ['user', 'value', 'title'],
        watch: {
            user(value) {
                this.userData = value ? { ...value } : { ...empty }
            },
            userData(value) {
                this.$emit('formChange', this.userData)
            }
        },
        data() {
            return {
                userData: { ...empty }
            }
        },
        computed: {
            creating() {
                return this.userData.id === 0
            }
        },
        methods: {
            onConfirm() {
                const form = this.$refs.userForm
                if (!form.checkValidity()) {
                    form.reportValidity()
                } else {
                    this.$emit('submit', this.userData)
                    this.onClosingModal()
                }
            },
            onCancel() {
                this.onClosingModal()
            },
            onClosingModal() {
                this.$emit('input', false)
            }
        },
        components: {
            AtInputCustom
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
