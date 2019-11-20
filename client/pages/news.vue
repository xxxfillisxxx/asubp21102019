<template>
    <div class="block-content uk-grid uk-grid-collapse">
    <div class="uk-width-1-1 uk-container-center uk-margin-bottom"> 
        <h2>Новости</h2>
        <div class="news-block">
            <ul class="tabs">
               <template v-for="[source, news] in Object.entries(news)">
                   <li v-if="news" :key="source" :class="{ active: source === active }" @click="() => setActive(source)">
                     {{ news.title }}
                    </li>
               </template>                
            </ul>
            <ul class="news">
                <template v-for="[source, news] in Object.entries(news)">
                    <li v-if="news" :key="source" :class="{ active: source === active, news: true }">
                        <new v-for="_new in news.items" :key="_new.link" :_new="_new"/> 
                    </li>
                </template>                    
            </ul>
        </div>
    </div>
</div>
</template>

<script>
    function promisedProperties(object) {

        let promisedProperties = [];
        const objectKeys = Object.keys(object);

        objectKeys.forEach((key) => promisedProperties.push(object[key]));

        return Promise.all(promisedProperties)
            .then((resolvedValues) => {
            return resolvedValues.reduce((resolvedObject, property, index) => {
                resolvedObject[objectKeys[index]] = property;
                return resolvedObject;
            }, object);
            });

    }

    import New from '~/components/news.vue'
    export default {
        async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
            const { sources } = await store.dispatch('news/getSourceList')
            const newsPromises = sources.reduce((acc, s) => ({ ...acc, [s]: store.dispatch(`news/getNewsDataBySource`, { name: s })}), {})
            let news = {}
            try {
                news = await promisedProperties(newsPromises)
            } catch (error) {
                console.error(error)
            }

            return { news, active: Object.keys(news)[0] }
        },
        methods: {
            setActive(active) {
                this.active = active
                this.$nextTick(function () {
                    document.querySelector('h2').scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
            }
        },
        components: {
            New
        }
    }
</script>