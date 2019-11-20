<template>
    <div class="block-content">
            <h2>Документация</h2>
            <div class="uk-grid uk-grid-collapse uk-text-center docs">       
                <subsystem-card v-for="subsystem in subsystems" :key="subsystem.id" :subsystem="subsystem" />
            </div>
    </div>
</template>

<script>
    import SubsystemCard from '~/components/subsystemCard.vue'
    export default {
        async asyncData({ app, store }) {
            const subsystems = await store.dispatch('subsystems/getSubsystems')
            return {
                subsystems
            }
        },
        components: {
            SubsystemCard
        }
    }

</script>
