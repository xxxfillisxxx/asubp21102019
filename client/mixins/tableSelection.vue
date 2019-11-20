<script>
    export default {
        data() {
            return {
                selection: []
            }
        },
        computed: {
            emptySelection() {
                return this.selection.length === 0
            }
        },
        methods: {
            onSelectionChange(selection) {
                this.selection = selection
            }
        }
    }
</script>