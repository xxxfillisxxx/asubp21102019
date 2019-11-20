<template>
    <div style="display: flex; align-items: center; justify-content: center; height: 100%;">
            
            <form style="border: 1px solid #e2ecf4; border-radius: 4px 4px 0 0; padding: 15px; min-width: 250px; display: flex; flex-direction: column; align-items: stretch;">        
            <h3 style="color: red;" v-if="$route.query.message">Для входа в этот раздел необходимо авторизоваться</h3>
            <h2 style="text-align: center;" v-if="!$route.query.message">Авторизация</h2>
            <at-input ref="login" @input="resetError" :status="inputStatus" v-model="login" size="large" style="margin-bottom: 10px;"/>
            <at-input @input="resetError" :status="inputStatus" v-model="password" type="password" size="large" style="margin-bottom: 10px;"/>
            <at-button @click="doLogin" type="primary" size="large" style="width: 100%">Войти</at-button>
            <input type="submit" style="position: absolute; left: -9999px; width: 1px; height: 1px;" />
            </form>
        
        </div>
</template>

<script>
    import 'at-ui-style/css/at.css'
    import '~/styles/style.css'
    export default {
        layout: 'empty',
        data() {
            return {
                login: '',
                password: '',
                error: false
            }
        },
        mounted() {
            
            this.$refs.login.$el.querySelector('input').focus()
        },
        computed: {
            loginData() {
                const { login, password } = this
                return {
                    login,
                    password
                }
            },
            inputStatus() {
                return this.error ? "error" : "false"
            }
        },
        methods: {
            async doLogin() {
                try {
                    console.log( window.history)
                    const user = await this.$store.dispatch('login', { ...this.loginData })
                    window.history.length > 1? this.$router.go(-1): this.$router.push('/admin/subsystems') 

                } catch (error) {                   
                    this.error = true
                }
                //     // if (this.$router.go(-1)){
                //         this.$router.next()
                //     // }
                //     // else{
                //     //     this.$router.push('/admin/subsystems')
                //     // }
                   
                // } catch (error) {
                //     console.error('123')
                //     this.error = true
                // }
            },
            resetError() {
                this.error = false
            }
        }
    }
</script>

<style lang="scss">
    @import 'at-ui-style/css/at.css';
    @import '~/styles/style.css';
</style>
