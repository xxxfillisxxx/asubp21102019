export default (...buttons) => (h, params) => {
    return h(
        'div', 
        buttons
        .filter(button => button.disable ? !button.disable(params) : true)
        .map(button => h('AtButton', {
            props: {
                size: 'small',
                hollow: true
            },
            style: {
                marginRight: '8px',
                minWidth: '10%'
            },
            on: {
                click: () => button.onClick(params)
            }
        },
        button.title
        )
        )
    )
}