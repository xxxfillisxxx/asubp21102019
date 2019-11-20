<template>
    <div class="at-table__footer" >
        <span class="at-pagination__total ">Всего {{count}} записей</span>
        <at-pagination class="" :total="count" @page-change="onPageChange"></at-pagination>
    </div>
</template>

<script>
    export default {
        props: ['count'],
        methods: {
            onPageChange(pageNumber) {
                this.$emit('page-change', pageNumber)
            }
        }
    }
</script>
