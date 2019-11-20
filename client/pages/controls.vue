<template>
  <div class="block-content">
  <h2>Контроли</h2>
  <div v-for="control in controls" :key="control.id" :ref="'control'+control.id" :id="'control'+control.id">

    <h3
          :data-uk-toggle="getTarget(control.id)"
          class="uk-width-1-1 control-title"
          :class="controls.length>0?'have-info':''"
          @click="changeArrow(control.id)"
    >
      {{ control.title }}
      <i  class="uk-icon-angle-right uk-icon-small" style="float:right"></i>
    </h3>
    <div :id="'controlInfo-'+control.id" class="uk-hidden">
    <div :key="control.id" class="control-item" :ref="'control'+control.id" >
            <div >
              <h3 class="control-item_title">{{ control.description }}</h3>
              <h3 class="control-item_description"> {{ control.formula }}</h3>
              <hr>
              <a class="uk-button" :href="getLink(control)" data-v-01f3d14e="">Подробнее</a>
            </div>
    </div>
    </div>
  </div>
  </div>
</template>

<script>

    import { actionNames } from '~/store/default/-actions'
    import { mapGetters, mapActions, store } from 'vuex'
    const storeName = 'controls'
    export default {
        layout: 'default',
        name:'controls',
        async fetch({ store, params }) {
            await store.dispatch(`${storeName}/${actionNames.GET_ITEMS}`)
            
            
        },

        computed: {
            ...mapGetters({
                controls: `controls/data`,
                data: `${storeName}/data`,
                count: `${storeName}/count`,
                

            })
        },
        methods:{
           getLink(control, store) {
            //  console.log(this.$store.getters.isFO)
            //  if(this.$store.getters.isFO||this.$store.getters.isAdmin){
                return `control/${control.id}`
            //  }
            //  else{
            //     return `admin/login`
        // }
            },
          getTarget(id) {
            return "{target:'#controlInfo-" + id + "'}";
          },
          goToControl(id,control) {
            
              this.$nextTick(function() {
              this.changeArrow(control)
              this.$refs["control" + control][0].querySelector('#controlInfo-'+control).classList.remove("uk-hidden")
              this.$refs["control" + id][0].scrollIntoView();
              window.scrollBy(0, -45);
          });
        }
        ,
          changeArrow(id){
              this.$nextTick(function() {
                  let icon = this.$refs["control" + id][0].querySelector('h3 i.uk-icon-angle-right')
                  if(icon){
                      if(this.$refs["control" + id][0].querySelector('#controlInfo-'+id).classList.contains('uk-hidden')){
                          icon.classList.remove('active')
                      }else{
                          icon.classList.add('active')
                      }
                  }
            });
          }
        }
    }
</script>

<style scoped>

.break-word{
    word-wrap:break-word;
    max-width:150px;   
}
ul.v-tabs li {
  background-color: #ededed;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid #cecece;
  border-bottom: none;
  font-size: 14px;
}
.uk-link i{
    color: #000;
}
.uk-icon-angle-right{
    transition: transform 0.2s;
}
.uk-icon-angle-right.active{
    transform: rotate(90deg)
}

ul.v-tabs li.active {
  background-color: white;

  border-top: 1px solid #29477f;
}
h3.control-title {
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px 10px;
  background-color: #29477f;
  color: #fff;
  margin: 0;
  font-size: 16px;
  margin-bottom: 2px;
}

h3.control-title.have-info {
  cursor: pointer;
}

h3.control-title.have-info:hover {
  background-color: rgb(67, 97, 153);
}

h3.control-title > div {
  float: right;
  transform: rotate(180deg);
}
.control-item {
  margin: 5px 0;
  margin-bottom: 20px;
  border: 1px solid #aaa;
  /*padding-bottom: 15px;*/
  border-radius: 0 0 5px 5px;
  box-sizing: bodrer-box;
  font-size: 14px;
  &_settings {
    background-color: #e5e5e5;
    padding: 10px;
    border-bottom: solid 1px #ddd;
  }
  &_title {
    font-size: 18px;
    /*text-transform: uppercase;*/
    padding: 0 5px;
    font-family: Arial, Helvetica, sans-serif;
    text-align: left;
  }
  &_description {
    display: flex;
    text-align: left;
    flex-direction: row;
    justify-content: space-between;
    ul {
      width: 46%;
      li {
        padding-bottom: 5px;
        background-color: #fff;
        border-bottom: solid 1px #ddd;
        padding: 3px 10px;
        .value {
          word-wrap: break-word;
        }
        @media (min-width: 1220px) {
          .value {
            float: right;
          }
        }
      }
    }
  }
  }
</style>