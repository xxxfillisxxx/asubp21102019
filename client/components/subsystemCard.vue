<template>
    <div class="uk-width-large-1-4 uk-width-medium-1-3 uk-width-small-1-2 uk-width-1-1 doc uk-vertical-align" >
        <div class="uk-vertical-align-bottom">
            <div class="shedow">
                <a class="item" :href="subsystem.url || getLink(subsystem)">
                    {{subsystem.name}}
                    <div class="products" v-if="subsystem.description">
                        {{subsystem.description}}
                    </div>
                </a>
            </div>
            
            <a class="uk-button" :href="subsystem.url || getLink(subsystem)">подробнее</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'subsystem-card',
        props: ['subsystem'],
        methods: {
            getLink(subsystem) {
                return `subsystem/${subsystem.id}`
            }
        }
    }
</script>
