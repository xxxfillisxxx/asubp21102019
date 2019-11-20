<script>
    export default {
        data() { 
            return {
               editModal: false,
               editData: null
            }
        },
        computed: {
            isCreating() {
                return !this.editData
            },
            modalTitle() {
                return this.isCreating ? this.modalTitles.create : this.modalTitles.edit
            }
        },
        methods: {
            openEditModal() {
                this.editModal = true
            },
            closeEditModal() {
                this.editModal = false
            },
            clearFormData() {
                this.editData = null
            },
            editDataModal(data) {
                this.clearFormData()
                this.editData = data
                this.openEditModal()
            },
            createDataModal() {
                this.clearFormData()
                this.openEditModal()
            },
        }
    }
</script>