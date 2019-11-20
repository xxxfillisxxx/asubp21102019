<template>
    <div class="uk-width-large-1-4 uk-width-medium-1-3 uk-width-small-1-2 uk-width-1-1 doc uk-vertical-align wow fadeInUp" data-wow-duration="0.5s">
        <div class="uk-vertical-align-bottom">
            <div class="shedow">
                <a class="item" href="index.php?page=3">
                    {{subsystem.name}}
                    <div class="products">
                        ({{subsystem.description}})
                    </div>
                </a>
            </div>
            
            <a class="uk-button" href="index.php?page=3">подробнее</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'subsysmte-card',
        props: ['subsystem']
    }
</script>
