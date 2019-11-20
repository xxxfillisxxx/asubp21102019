<template>
<div>
    <h2>{{control.title}}</h2>


    <table>
          <tbody>
              <tr>
              <td>Описание</td>
              <td >{{control.description}}</td>
              </tr>
              <tr>
              <td>Формула</td>
              <td>{{control.formula}}</td>
              </tr>
              <tr>
              <td>Сообщение контроля</td>
              <td>{{control.message}}</td>
              </tr>
          </tbody>

    </table>
    <hr>
    <h1>Комментарии</h1>
    <a class="uk-button" @click="createDataModal">Добавить комментарий</a>
    
    <comment v-for="comment in control.comments" :key="comment.id" :comment="comment" />
    <modal-form :schema="commentForm" v-model="editModal" :title="editCommentModalTitle" @submit="submitComment"/>
</div>
</template>
<script>
import Comment from '~/components/comment.vue'
import { DataModelConverter, DataModelFactory } from '@/common/DataModel'
import ModalForm from '~/components/modalForm.vue'
import EditModalMixin from '~/mixins/editModal.vue'
import { mapGetters, mapActions, store } from "vuex";
import { actionNames } from "@/store/default/-actions";
const storeName = "controls";
const emptyComment = {
        id: 0,
        upComment: 0,
        text: '',
        user: 0,
        control: 0,
    }
export default {
   
    middleware: ['authenticated'],
    
    layout: 'default',
    async asyncData({ store, params }) {
        const control = await store.dispatch(`${storeName}/${actionNames.GET_ITEM_FRONTEND}`, { id: params.id});
        return { control};    
    },
    async fetch({ store, params }) {
            const control = Number.parseInt(params.id)
            store.dispatch(`${storeName}/${actionNames.UPDATE_CRITERIA}`, {control})
            await store.dispatch(`${storeName}/${actionNames.GET_ITEM_FRONTEND}`, { id: control})
        },
    mixins: [EditModalMixin],
    computed:{
        
      ...mapGetters({
                
                data: `${storeName}/data`,
                count: `${storeName}/count`
            }),
        
      editCommentModalTitle () { return this.editData ? 'Изменение комментария' : 'Создание комментария' },
        commentForm () {    
                const m = !this.isCreating ? this.editData : emptyComment
                const schema = [
                    {
                        key: 'id',
                        value: m.id,
                        hidden: true
                    },
                    {
                        key: 'upComment',
                        value: m.upComment,
                        hidden: true
                    },
                    {                        
                        key: 'user',
                        value: m.user,
                        required: true,
                        hidden: true
                    },
                    {                        
                        key: 'control',
                        value: this.control.id,
                        required: true,
                        hidden: true
                    },
                    {
                        
                        key: 'text',
                        value: m.text,
                        type:'string',
                        hidden: false
                    }
                ]
                return schema

            }
    },
    components: {
            ModalForm,
            Comment
           
        },
    methods:{
      ...mapActions('comments', {
                createComment:  actionNames.CREATE_ITEM,
                },
                ),
      async submitComment(comment) {
          const user = this.$store.getters.getId
          const { id, upComment, text, control} = comment
          
                if (id === 0) {                    
                    const newComment = await this.createComment({ upComment, text, user, control})                    
                    const {data} = await this.$axios.get(`/api/v1/controls/getControl`, {params:{id:control}})
                    this.control = data
                    
                    // this.$Notify({
                    //     type: 'success',
                    //     title: `Создание комментария`,
                    //     message: 'Комментарий успешно создан'
                    // })
                    
                    // this.update()
                    
                    
                } else {
                    // const params = { text, id }
                    // if(this.$store.getters.isAdmin){
                        // params.isAdmin = isAdmin
                    // }                  
                    // if (password) {
                    //     params.password = password
                    // }
                    // const editedComment = await this.editComment(params)
                    // const index = this.commentsData.findIndex((comment) => comment.id === editedComent.id)
                    // this.usersData.splice(index, 1, editedComment)

                    // const newComment = await this.createComment({ upComment, text, user, control }) 
                    // const id = Number.parseInt(params.id);
                    // this.control = await store.dispatch(`${storeName}/${actionNames.GET_ITEM_FRONTEND}`, { id: id});
        
                    // this.$Notify({
                    //     type: 'success',
                    //     title: `Создание комментария`,
                    //     message: 'Комментарий успешно создан'
                    // })
                    // this.update()
                    
                }
                
                
                this.closeEditModal()
                this.clearFormData()
            },
        async onPageChange(page) {
          await this.setPage({ page })
        },
        
    }
}
</script>

<style  scoped>

h3 {
    font-size: 16px;
  }
h2{
    text-align: center;
    font-size: 18px;
    margin-bottom: 10px;
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica,
      "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
      "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
}
  h1,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
    font-weight: bold;
    line-height: 1.5;
    text-align: center;
    color: #2c405a;
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica,
      "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
      "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
  }
  h4,
  h5,
  h6 {
    font-size: 14px;
  }
  
  h3,
  h4 {
    margin-bottom: 10px;
  }
  p {
    margin: 0;
    padding: 0;
  }
  table {
    padding: 10px 10px;
    margin: auto;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px double #b3b3b3;
    text-align: left;}
    td,
    th {
      min-width: 2em;
      padding: 0.4em;
      border: 1px solid #d9d9d9;
    }
  
</style>