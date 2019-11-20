const pageSize = 10
const sort = 'id DESC'

const onPageChange = (dataFunction, dataName, pageSize = pageSize, sort = sort, params = {}) => async function (pageNumber) {
    this.pageNumber = pageNumber
    this.pageSize = pageSize
    const skip = (pageNumber - 1) * pageSize
    const limit = pageSize
    const data = await dataFunction({ skip, limit, sort, ...params })
    this[`${dataName}`] = data
    this.selection = []
}

const paginationMixin = {
    data() {
        return {
            pageNumber: 1,
            pageSize: 10,
            count: 0
        }
    },
    computed: {
        pagesCount () { return Math.ceil(this.count / this.pageSize) },
    },
    methods: {
        update() {
            this.onPageChange(this.pageNumber)
        },
    }
}

export { pageSize, sort, onPageChange, clearSelection, paginationMixin }