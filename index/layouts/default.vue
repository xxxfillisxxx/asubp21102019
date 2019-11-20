<template>
    <div>
        <div class="background">
            <div></div>
        </div>
        <header>
            <div id="main-menu">
                <div class="wrapper">
                    <nav class="uk-navbar uk-hidden-small">
                        <ul class="uk-navbar-nav uk-grid uk-grid-collapse uk-text-center" style="width:100%">
                            <li class="uk-width-1-4"><a href="index.php?page=14">Новости</a></li>
                            <li class="uk-width-1-4"><a href="">Документация</a></li>
                            <li class="uk-width-1-4" data-uk-dropdown="" aria-haspopup="true" aria-expanded="false">
                                <a>Сервисы</a>

                                <div class="uk-dropdown uk-dropdown-navbar uk-dropdown-bottom" style="top: 40px; left: 0px;width:100%;padding-top: 0;padding-bottom:0 ">
                                    <ul class="uk-nav uk-nav-navbar">
                                        <li>
                                            <a href="index.php?page=10">
                                                Регистрация пользователей в подсистемах АСУБП СО
                                            </a>
                                        </li>
                                        <li>
                                            <a href="http://helpdesk.sakhminfin.ru">
                                                Сервис учета обращений
                                            </a>
                                        </li>
                                        
                                    </ul>
                                </div>

                            </li>
                            <li class="uk-width-1-4" data-uk-dropdown="" aria-haspopup="true" aria-expanded="false">
                                <a href="index.php?page=9">Контакты</a>

                                <div class="uk-dropdown uk-dropdown-navbar uk-dropdown-bottom" style="top: 40px; left: 0px;width:100%;padding-top: 0;padding-bottom:0 ">
                                    <ul class="uk-nav uk-nav-navbar">
                                        <li><a href="index.php?page=9&category=2">Web-торги</a></li>
                                        <li><a href="index.php?page=9&category=3">Бюджет Смарт</a></li>
                                        <li><a href="index.php?page=9&category=4">План Смарт</a></li>
                                        <li><a href="index.php?page=9&category=5">Свод Смарт</a></li>
                                        <li><a href="index.php?page=9&category=1">Финконтороль Смарт</a></li>
                                    </ul>
                                </div>

                            </li>
                        </ul>
                    </nav>
                    <div class="uk-button-dropdown uk-visible-small" data-uk-dropdown="{mode:'click'}">
                        <div class="uk-button" style="padding:2px 5px;color:#fff;border:none;background:none"><i class="uk-icon-bars uk-icon-large"></i></div>
                        <div class="uk-dropdown  uk-overflow-container" style="top: 30px; left: 0px;width:280px; max-height:90vh">
                            <ul class="uk-nav uk-nav-dropdown">
                                <li><a href="index.php?page=14">Новости</a></li>
                                <li><a href="">Документация</a></li>
                                <li><a>Сервисы</a></li>
                                <li class="submenu"><a href="index.php?page=10">
                                                Регистрация пользователей в подсистемах АСУБП СО
                                            </a></li>
                                <li class="submenu"><a href="http://helpdesk.sakhminfin.ru">
                                                Сервис учета обращений
                                            </a></li>                     
                                <li><a href="index.php?page=9">Контакты</a></li>
                                <li class="submenu"><a href="index.php?page=9&category=2">Web-торги</a></li>
                                <li class="submenu"><a href="index.php?page=9&category=3">Бюджет Смарт</a></li>
                                <li class="submenu"><a href="index.php?page=9&category=4">План Смарт</a></li>
                                <li class="submenu"><a href="index.php?page=9&category=5">Свод Смарт</a></li>
                                <li class="submenu"><a href="index.php?page=9&category=1">Финконтороль Смарт</a></li>
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
                    <li class="uk-width-1-1"><a href="index.php?page=10">
                            Регистрация пользователей в подсистемах АСУБП СО
                        </a></li>
                    <li class="uk-width-1-1"><a href="http://helpdesk.sakhminfin.ru">
                            Сервис учета обращений
                        </a></li>
                    <li class="uk-width-1-1"><a href="index.php?page=9">
                            Контакты
                        </a></li>
                </ul>
            </div>
        </header>
        <main class="wow fadeInUp" data-wow-duration="0.7s">
            <div class="wrapper block">
			<nuxt />	
            <div id="links">
                <hr>
                <h3 class="uk-text-center levelHeader uk-margin-bottom"><i class="uk-icon-link"></i>Полезные
                        ссылки</h3>
                <hr>
                <div class="uk-slidenav-position" data-uk-slider="">

                    <div class="uk-slider-container uk-margin-bottom">
                        <ul class="uk-slider uk-grid  uk-grid-width-large-1-5 uk-grid-width-medium-1-5 uk-grid-width-small-1-5"
                                style="min-width: 2468.25px; min-height: 137px; transform: translateX(0px);">
                            <li class='linksItem'><a href='http://budget.gov.ru/' target="_blank"><img src="images/links/ebudget-01.png"
                                            alt='image'></a></li>
                            <li class='linksItem'><a href='https://uslugi.admsakhalin.ru' target="_blank"><img src="images/links/gosuslugiSakh.png"
                                            alt='image'></a></li>
                            <li class='linksItem'><a href='http://mineconom.admsakhalin.ru/_index_mb.php?' target="_blank"><img
                                            src="images/links/infobusiness-01.png" alt='image'></a></li>
                            <li class='linksItem'><a href='http://fkr65.ru' target="_blank"><img src="images/links/capremont-01.png"
                                            alt='image'></a></li>
                            <li class='linksItem'><a href='http://spsakh.ru/' target="_blank"><img src="images/links/cassa-01.png"
                                            alt='image'></a></li>
                            <li class='linksItem'><a href='http://minfin.ru/ru/' target="_blank"><img src="images/links/minfin.png"
                                            alt='image'></a></li>
                            <li class='linksItem'><a href='http://xn--80aaeza4ab6aw2b2b.xn--p1ai/materials/' target="_blank"><img
                                            src="images/links/DwithF.png" alt='image'></a></li>
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
// import 'uikit/dist/css/uikit.min.css'

// import 'uikit/dist/css/uikit.css'
// import '~/styles/main-style.css'

export default {

}
</script>

<style lang="scss">
    @import 'uikit/dist/css/uikit.css';
    @import '~/styles/main-style.css'

</style>
