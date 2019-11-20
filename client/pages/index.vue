<template>
    <div class="block-content">
            <h2>Документация</h2>
            <div class="uk-grid uk-grid-collapse uk-text-center docs">
                <subsystem-card v-for="subsystem in subsystems" :key="subsystem.id" :subsystem="subsystem" />
                <subsystem-card :subsystem="{ name: 'Дистрибутивы (Установочные файлы), настройки', url: '/distributions' }" />
            </div>
    </div>
</template>

<script>
    import SubsystemCard from '~/components/subsystemCard.vue'
    import { actionNames } from '~/store/default/-actions'
    import { mapGetters, mapActions } from 'vuex'
    const storeName = 'subsystems'
    export default {
        layout: 'default',
        async asyncData({ app, store }) {
            const subsystems = await store.dispatch(`${storeName}/${actionNames.GET_ITEMS_FRONTEND}`)
        },
        components: {
            SubsystemCard
        },
        computed: {
            ...mapGetters({
                subsystems: `${storeName}/data`,
            })
        },
    }
</script>
