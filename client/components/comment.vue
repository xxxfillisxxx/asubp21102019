<template>
    <div class="comment">
            <div class="text">
                   {{comment.text}}                    
                
            </div> 
            <div class="user">
                        <strong>Добавлено: </strong>{{new Date(comment.createdAt).toLocaleString()}} <strong>Пользователем: </strong>{{comment.user}}
            </div>          
     </div>
            
        
</template>
<script>
export default {
    name: 'comment',
    props: ['comment'],
}
</script>

<style scoped lang="scss">
.comment {
    display: block;
    padding: 1em;   
    background: #e3e8f0;
    border: 1px solid #74affb;
    border-radius: 5px;
    width: 80%;
    margin: 20px 0 0 1em;
}
.text{
font-size: 14px;
padding-bottom: 10px;

}
.user{
border-top: 1px solid #74affb;
padding: 0.5em 0 0.5em 0;
font-size: 12px;
text-align: right;
margin-top:0.5;
}

</style>