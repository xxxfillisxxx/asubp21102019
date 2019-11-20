<template> 
    <div>   
        <script>
            $(document).ready(function(){
                $('#cube-loader').fadeOut('fast');
            })
        </script>
        <div id="cube-loader">
            <div class="caption">
                <div class="cube-loader"> 
                    <div class="cube loader-1"></div>
                    <div class="cube loader-2"></div>
                    <div class="cube loader-4"></div>
                    <div class="cube loader-3"></div>
                </div>
            </div>
        </div>    
        <div class="background">
            <div></div>
        </div>
        <header>
            <div id="main-menu">
                <div class="wrapper">
                    <nav class="uk-navbar uk-hidden-small">
                        <ul class="uk-navbar-nav uk-grid uk-grid-collapse uk-text-center" style="width:100%">
                            <li class="uk-width-1-5"><a href="/news">Новости</a></li>
                            <li class="uk-width-1-5"><a href="/">Документация</a></li>
                            <li class="uk-width-1-5" data-uk-dropdown="" aria-haspopup="true" aria-expanded="false">
                                <a>Сервисы</a>

                                <div class="uk-dropdown uk-dropdown-navbar uk-dropdown-bottom" style="top: 40px; left: 0px;width:100%;padding-top: 0;padding-bottom:0 ">
                                    <ul class="uk-nav uk-nav-navbar">
                                        <li>
                                            <a href="/register">
                                                Регистрация пользователей в подсистемах АСУБП СО
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://helpdesk.sakhminfin.ru">
                                                Сервис учета обращений
                                            </a>
                                        </li>
                                        
                                    </ul>
                                </div>

                            </li>
                            <li class="uk-width-1-5" >
                                <a href="/contacts">Контакты</a>

                                <div class="uk-dropdown uk-dropdown-navbar uk-dropdown-bottom" style="top: 40px; left: 0px;width:100%;padding-top: 0;padding-bottom:0 ">
                                    <ul class="uk-nav uk-nav-navbar">
                                        <template v-for="subsystem in subsystems">
                                            <li v-if="subsystem.contacts.length>0" :key="subsystem.id">
                                                <a :href="'/contacts?subsystem='+subsystem.id">{{subsystem.description}}</a>
                                            </li>
                                        </template>                                        
                                    </ul>
                                </div>

                            </li>
                            
                            <li class="uk-width-1-5" v-if="userLogin" @click="logout">
                                    <div >
                                    <div >{{ userLogin.login }}</div>
                                      Выход</div>
                                </li>
                                
                        </ul>
                    </nav>
                    <div class="uk-button-dropdown uk-visible-small" data-uk-dropdown="{mode:'click'}">
                        <div class="uk-button" style="padding:2px 5px;color:#fff;border:none;background:none"><i class="uk-icon-bars uk-icon-large"></i></div>
                        <div class="uk-dropdown  uk-overflow-container" style="top: 30px; left: 0px;width:280px; max-height:90vh">
                            <ul class="uk-nav uk-nav-dropdown">
                                <li><a href="/news">Новости</a></li>
                                <li><a href="/">Документация</a></li>
                                <li><a>Сервисы</a></li>
                                <li class="submenu"><a href="/register">
                                                Регистрация пользователей в подсистемах АСУБП СО
                                            </a></li>
                                <li class="submenu"><a href="http://helpdesk.sakhminfin.ru">
                                                Сервис учета обращений
                                            </a></li>                    
                                <li><a href="/contacts">Контакты</a></li>
                                <template v-for="subsystem in subsystems">
                                    <li class="submenu" v-if="subsystem.contacts.length>0" :key="subsystem.id">
                                        <a :href="'/contacts?subsystem='+subsystem.id">{{subsystem.description}}</a>
                                    </li>        
                                </template>   
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class='wrapper'>
                <div class="logo-text">
                    <h1> <a href="/">АСУБП СО <br>автоматизированная система управления бюджетным процессом <br>Сахалинской области</a></h1>
                </div>
                <ul class="menu uk-grid uk-grid-collapse">
                    <li class="uk-width-1-1"><a href="/docs/Регламент технической поддержки АСУБП СО.pdf" target="_blank">
                            Регламент технической поддержки АСУБП СО
                        </a></li>
                    <li class="uk-width-1-1"><a href="/register">
                            Регистрация пользователей в подсистемах АСУБП СО
                        </a></li>
                    <li class="uk-width-1-1"><a href="http://helpdesk.sakhminfin.ru">
                            Сервис учета обращений
                        </a></li>
                    <li class="uk-width-1-1"><a href="/contacts">
                            Контакты
                        </a></li>
                </ul>
            </div>
        </header>
        <main>
            <div class="wrapper block">
			<nuxt />	
            <div id="links">
                <hr>
                <h3 class="uk-text-center levelHeader uk-margin-bottom"><i class="uk-icon-link"></i>Полезные
                        ссылки</h3>
                <hr>
                <div class="uk-slidenav-position" data-uk-slider>

                    <div class="uk-slider-container uk-margin-bottom">
                        <ul class="uk-slider uk-grid  uk-grid-width-large-1-5 uk-grid-width-medium-1-5 uk-grid-width-small-1-5"
                                style="min-width: 2468.25px; min-height: 137px; transform: translateX(0px);">
                            <li class='linksItem'><a href='http://budget.gov.ru/' target="_blank"><img src="/images/links/ebudget-01.png"
                                            alt='image'></a></li>
                            <li class='linksItem'><a href='https://uslugi.admsakhalin.ru' target="_blank"><img src="/images/links/gosuslugiSakh.png"
                                            alt='image'></a></li>
                            <li class='linksItem'><a href='http://mineco.sakhalin.gov.ru/' target="_blank"><img
                                            src="/images/links/infobusiness-01.png" alt='image'></a></li>
                            <li class='linksItem'><a href='http://fkr65.ru' target="_blank"><img src="/images/links/capremont-01.png"
                                            alt='image'></a></li>
                            <li class='linksItem'><a href='http://spsakh.ru/' target="_blank"><img src="/images/links/cassa-01.png"
                                            alt='image'></a></li>
                            <li class='linksItem'><a href='http://minfin.ru/ru/' target="_blank"><img src="/images/links/minfin.png"
                                            alt='image'></a></li>
                            <li class='linksItem'><a href='http://xn--80aaeza4ab6aw2b2b.xn--p1ai/materials/' target="_blank"><img
                                            src="/images/links/DwithF.png" alt='image'></a></li>
                        </ul>
                    </div>

                    <a href="#" class="uk-slidenav  uk-slidenav-previous" data-uk-slider-item="previous" draggable="false"></a>
                    <a href="#" class="uk-slidenav  uk-slidenav-next" data-uk-slider-item="next" draggable="false"></a>

                </div>
            </div>
</div>
        </main>   
		
		<footer>
        <div class="wrapper">
            <div class="copyright">
                <p>© 2017 Оператор системы - Министерство финансов Сахалинской области. Все
                    права защищены.</p>
                <p>Все права на материалы, находящиеся на сайте, охраняются в соответствии с
                    законодательством РФ, в
                    том числе об авторском праве и смежных правах.</p>
            </div>
        </div>
    </footer>
    </div>
</template>
<script>
    import { actionNames } from '~/store/default/-actions'
    import { mapGetters, mapActions, store } from 'vuex'
    const storeName = 'subsystems'
    export default {
        async asyncData({ app, store }) {
            const subsystems = await store.dispatch(`${storeName}/${actionNames.GET_ITEMS_FRONTEND}`)
        },
        computed: {
          userLogin(){
            return this.$store.state.user
          } ,
            ...mapGetters({
                subsystems: `${storeName}/data`,
            })
        },
        methods:{
          async logout() {
            await this.$store.dispatch('logout')
            this.$router.push({path: '/'})
                
                
            }
        }
    }
</script>

<style lang="scss">
    
    @import 'uikit/dist/css/uikit.css';
    @import 'uikit/dist/css/components/slider.css';
    @import 'uikit/dist/css/components/slidenav.min.css';
    @import '~/styles/main-style.css';
    
    // @import 'at-ui-style/css/at.css';
   .at-modal {
  position: relative;
  top: 100px;
  width: auto;
  margin: 0 auto;
  border: none;
  border-radius: 4px;
  background-color: #FFF;
  outline: none;
  /* elements */
  /* modifiers */
}

.at-modal__mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.at-modal__mask--hidden {
  display: none;
}

.at-modal__wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  outline: 0;
  z-index: 1000;
}

.at-modal__header {
  padding: 12px 16px;
  color: #2C405A;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.5;
  border-bottom: 1px solid #ECECEC;
}

.at-modal__header p, .at-modal__header .at-modal__title {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  vertical-align: middle;
}

.at-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 13px;
  line-height: 1;
  overflow: hidden;
  cursor: pointer;
}

.at-modal__body {
  padding: 16px;
  font-size: 13px;
  line-height: 1.5;
}

.at-modal__body p {
  font-size: 13px;
}

.at-modal__icon {
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 32px;
  vertical-align: middle;
}

.at-modal__input .at-input__original {
  margin-top: 8px;
  width: 100%;
}

.at-modal__footer {
  padding: 12px 16px;
  border-top: 1px solid #ECECEC;
  text-align: right;
}

.at-modal__footer .at-btn + .at-btn {
  margin-left: 8px;
}

.at-modal--hidden {
  display: none !important;
}

.at-modal--confirm .at-modal__header {
  padding: 16px 16px 4px 56px;
  border: none;
}

.at-modal--confirm .at-modal__body {
  padding: 8px 16px 8px 56px;
}

.at-modal--confirm .at-modal__footer {
  padding: 16px;
  border: none;
}

.at-modal--confirm-success .at-modal__icon {
  color: #5ADD94;
}

.at-modal--confirm-error .at-modal__icon {
  color: #FF8080;
}

.at-modal--confirm-warning .at-modal__icon {
  color: #FFD96B;
}

.at-modal--confirm-info .at-modal__icon {
  color: #A1BFFC;
}
.at-input {
  position: relative;
  font-size: 0;
  line-height: 1.5;
  outline: 0;
  /* element */
  /* Modifier */
}

.at-input__original {
  display: block;
  width: 100%;
  padding: 6px;
  color: #3F536E;
  font-size: 12px;
  background-color: #FFF;
  border: 1px solid #C5D9E8;
  border-radius: 4px;
  -webkit-transition: border .2s;
  transition: border .2s;
  outline: none;
}
.at-textarea__original {
  display: block;
  width: 80%;
  padding: 6px ;
  color: #3F536E;
  font-size: 12px;
  line-height: 1.5;
  border: 1px solid #C5D9E8;
  border-radius: 4px;
  background-color: #FFF;
  -webkit-transition: border .3s;
  transition: border .3s;
  outline: 0;
  resize: vertical;
}

.at-textarea__original::-webkit-input-placeholder {
  color: #C9C9C9;
}

.at-textarea__original:-ms-input-placeholder {
  color: #C9C9C9;
}

.at-textarea__original::placeholder {
  color: #C9C9C9;
}

.at-textarea__original:hover {
  border-color: #79A1EB;
}

.at-textarea__original:focus {
  border-color: #79A1EB;
}

.at-textarea--disabled .at-textarea__original {
  color: #B1B1B1;
  border-color: #ECECEC;
  background-color: #F7F7F7;
  cursor: not-allowed;
}

.at-textarea--disabled .at-textarea__original::-webkit-input-placeholder {
  color: #C9C9C9;
}

.at-textarea--disabled .at-textarea__original:-ms-input-placeholder {
  color: #C9C9C9;
}

.at-textarea--disabled .at-textarea__original::placeholder {
  color: #C9C9C9;
}

</style>
