<template>
    <div class="new">
        <span>{{ convertDate(_new.isoDate) }}</span>
        <a :href="_new.link">
            {{ _new.title }}
        </a>
        <p>
            {{ _new.content }}
        </p>
    </div>
</template>

<script>

    export default {
        props: ['_new'],
        methods: {
            convertDate(date) {
                return this.$moment(date).format("DD.MM.YYYY")
            }
        }
    }
</script>
