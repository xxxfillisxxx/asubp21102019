<template>
        <div>
            <div style="width: 100%; height: 48px; margin-bottom: 10px;">
                    <at-menu class="full-height" style="width: 100%;" router ref="menu" mode="horizontal">
        
                                <at-menu-item 
                                    name="admin-subsystems" 
                                    :to="{ name: 'admin-subsystems' }"
                                >
                                    Подсистемы
                                </at-menu-item>
                                <at-menu-item 
                                    name="admin-news" 
                                    :to="{ name: 'admin-news' }"
                                    v-if="$store.getters.isAdmin"
                                >
                                    Новости
                                </at-menu-item>
                                <at-menu-item 
                                    name="admin-users" 
                                    :to="{ name: 'admin-users' }"                                    
                                >
                                    Пользователи
                                </at-menu-item>
                      <at-menu-item
                              name="admin-controls"
                              :to="{ name: 'admin-controls' }"
                      >
                       Контроли
                      </at-menu-item>
                                
                                <li class="at-menu__item" style="float: right" @click="logout">
                                    <div class="at-menu__item-link">Выход</div>
                                </li>
                                <li style="float: right" v-if="userLogin">{{ userLogin.login }}</li>
                        </at-menu>
            </div>
    
        <div class="row at-row full-height">
            
                <div class="container">
                    <nuxt />
                </div>

        </div>
        </div>

</template>

<script>
    export default {
        mounted() {
            this.$refs.menu._data.currentActiveName = this.$router.currentRoute.name
        },
        middleware: ['authenticated'],
        errorCaptured (err, vm, info) {
            this.$Notify.error({
                message: info
            })
            console.log(err, vm, info)
            return false
        },
         computed: {
          userLogin(){
            return this.$store.state.user
          }
         },
        methods: {
            logout() {
                this.$store.dispatch('logout')
                this.$router.push({path: '/admin/login'})
            }
        }
    }
</script>

<style scoped>
    .full-height {
        height: 100%;
    }
</style>

 <style lang="scss">
    @import 'at-ui-style/css/at.css';
    @import '~/styles/style.css';

    .at-breadcrumb {
        margin-bottom: 20px;
    }
 </style>

 