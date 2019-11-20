<template>
    <div class="block-content">
      <at-breadcrumb separator=">">
            <at-breadcrumb-item :to="{ name: 'admin-subsystems' }">Список подсистем</at-breadcrumb-item>
            <at-breadcrumb-item>FAQ для подсистемы : {{ faq.subsystem.name }}</at-breadcrumb-item>
        </at-breadcrumb>
        <h2>FAQ для подсистемы : {{ faq.subsystem.name }}</h2>
        <form>
            <label>
                Заголовок
                <at-input v-model="faq.title" placeholder="Please input"></at-input>
            </label>
            <label>Подробный FAQ</label>
            <no-ssr>
              <ckeditor v-model="faq.body"/>
            </no-ssr>
            <button @click.prevent="submit">Сохранить</button>
        </form>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import { actionNames } from '@/store/default/-actions'
    import ckeditor from '@/plugins/ckeditor'
    const storeName = 'faqs'
export default {
    layout: 'admin',
    async asyncData({ store, params }) {
        const id = Number.parseInt(params.id)
        const faq = await store.dispatch(`${storeName}/${actionNames.GET_ITEM}`,{ id })
        return { faq }
    },
    computed: {
            ...mapGetters({
                data: `${storeName}/data`,
                count: `${storeName}/count`
            }),
    },
    methods:{
        ...mapActions(storeName,{
            update: actionNames.EDIT_ITEM
        }),
        async submit(){
            let data = { title: this.faq.title, body: this.faq.body, id: this.faq.id}
            console.log(data)
            const res = await this.update(data)
            console.log(res)
        }
    }
}
</script>

<style >
    .uk-table td {
        text-align: left;
    }

    .uk-table caption {
        color: black;
        font-style: initial;
        font-size: 18px;
        margin-bottom: 10px;
    }
    .ck.ck-editor__main>.ck-editor__editable{
  height: 400px;
}
</style>

