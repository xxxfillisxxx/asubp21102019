export default (els) => (els || []).map((el) => {
    return {
        ...el,
        createdAt: (new Date(el.createdAt)).toLocaleString(),
        updatedAt: (new Date(el.updatedAt)).toLocaleString()
    }
})