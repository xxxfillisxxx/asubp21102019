<template>
  <div class="block-content">
    <h2>Дистрибутивы (Установочные файлы) и настройки для работы с подсистемами АСУБП СО</h2>
    <ul class="v-tabs">
      <li :class="{ active: type === 'list' }" @click="setType('list')">Списком</li>
      <li :class="{ active: type === 'table' }" @click="setType('table')">Таблицей</li>
    </ul>
    <div v-show="type === 'list'" class="dist">
      <div v-for="subsystem in subsystems" :key="subsystem.id" :ref="'subsystem'+subsystem.id">
        <h3
          :data-uk-toggle="getTarget(subsystem.id)"
          class="uk-width-1-1 subsystem-title"
          :class="subsystem.distributives.length>0?'have-dist':''"
          @click="changeArrow(subsystem.id)"
        >
            {{ subsystem.name }} {{ subsystem.description }}
            <i v-if="subsystem.distributives.length>0" class="uk-icon-angle-right uk-icon-small" style="float:right"></i>
        </h3>
        <div :id="'subsystemInfo-'+subsystem.id" class="uk-hidden">
        <h1  v-if="subsystem.id==17">
            <a href="/controls">
              Контроли
            </a>
          </h1>
          <div v-for="dist in elemSort(subsystem.distributives)" :key="dist.id" class="dist-item" :ref="'dist'+dist.id">
            <div class="dist-item_settings">
              <h3 class="dist-item_title">{{ dist.name }}</h3>
              <div class="dist-item_description">
                <ul>
                  <li>
                    Сервер БД:
                    <span class="value">{{ dist.server_bd }}</span>
                  </li>
                  <li v-if="dist.db_ms">
                    СУБД:
                    <span class="value">{{ dist.db_ms }}</span>
                  </li>
                  <li>
                    Имя БД:
                    <span class="value">{{ dist.bd_name }}</span>
                  </li>
                </ul>
                <ul>
                  <li>
                    Сервис Приложений:
                    <template v-if="dist.server_app.indexOf('http')!=-1">
                      <a class="value" :href="dist.server_app">{{ dist.server_app }}</a>
                    </template>
                    <template v-else>
                      <span class="value">{{ dist.server_app }}</span>
                    </template>
                  </li>
                  <li>
                    Сервис Обновлений:
                    <template v-if="dist.server_update.indexOf('http')!=-1">
                      <a class="value" :href="dist.server_update">{{ dist.server_update }}</a>
                    </template>
                    <template v-else>
                      <span class="value">{{ dist.server_update }}</span>
                    </template>
                  </li>
                  <li>
                    Сервис WEB-клиента:
                    <template v-if="dist.server_web.indexOf('http')!=-1">
                      <a class="value" :href="dist.server_web">{{ dist.server_web }}</a>
                    </template>
                    <template v-else>
                      <span class="value">{{ dist.server_web }}</span>
                    </template>
                  </li>
                </ul>
              </div>
            </div>
            <div
              v-for="category in (getCategories(dist.id))"
              :key="category.id"
              class="dist-item_category-item"
            >
              <h3 class="dist-item_category_title">{{category.name}}</h3>
              <table class="dist-item_category_table">
                <tbody>
                  <tr v-for="doc in elemSort(category.documents)" :key="doc.id">
                    <td style="width:30%;">{{ doc.name }}</td>
                    <td style="width:60%;">{{ doc.description }}</td>
                    <td style="width:10%;" class="uk-text-center">
                      <a :href="getDownloadLink(doc)">Загрузить</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="type === 'table'" class="dist table-blue">
      <table id="page11_table" class="table_blur uk-table uk-table-striped">
        <thead>
          <tr>
            <th rowspan="2" class="uk-table-middle">Наименование подсистемы</th>
            <th rowspan="2" class="uk-table-middle">Дистрибутив</th>
            <th colspan="6" class="uk-table-middle">Параметры подключения</th>
          </tr>

          <tr>
            <th>Сервер баз данных</th>
            <th>СУБД</th>
            <th>Имя базы данных</th>
            <th>Сервис приложений</th>
            <th>Сервис обновлений</th>
            <th>Сервис Web приложений (для работы через браузер)</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="subsystem in subsystems">
            <tr v-for="(dist,index) in subsystem.distributives" :key="dist.id">
              <td
                v-if="index==0"
                :rowspan="subsystem.distributives.length"
                @click="goToSubsystem(subsystem.id)"
                class="uk-link"
              >
                {{ subsystem.name }}<br>
                <i>{{ subsystem.description }}</i>
              </td>
              <td  @click="goToDist(dist.id,subsystem.id)" class="uk-link">{{dist.name}}</td>
              <td>{{ dist.server_bd}}</td>
              <td>{{ dist.db_ms }}</td>
              <td>{{ dist.bd_name }}</td>
              <td class="break-word">
                <template v-if="dist.server_app.indexOf('http')!=-1">
                  <a class="value" :href="dist.server_app">{{ dist.server_app }}</a>
                </template>
                <template v-else>{{ dist.server_app }}</template>
              </td>
              <td class="break-word">
                <template v-if="dist.server_update.indexOf('http')!=-1">
                  <a class="value" :href="dist.server_update">{{ dist.server_update }}</a>
                </template>
                <template v-else>{{ dist.server_update }}</template>
              </td>
              <td class="break-word">
                <template v-if="dist.server_web.indexOf('http')!=-1">
                  <a class="value" :href="dist.server_web">{{ dist.server_web }}</a>
                </template>
                <template v-else>{{ dist.server_web }}</template>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { actionNames } from "@/store/default/-actions";
import { mapGetters, mapActions } from "vuex";

const storeName = "distributives";
export default {
  name: "DistributivesPage",
  async fetch({ store, params }) {
    await store.dispatch(`subsystems/${actionNames.GET_ITEMS_FRONTEND}`);
    await store.dispatch(`categories/${actionNames.GET_ITEMS_FRONT}`);
  },
  layout: 'default',
  data() {
    return {
      type: "list"
    };
  },

  computed: {
    ...mapGetters({
      subsystems: `subsystems/data`,
      categories: `categories/data`,
      data: `${storeName}/data`,
      count: `${storeName}/count`
    })
  },
  methods: {
    elemSort(elems){
        return [...elems].sort(
            (prev, next) => prev.orderField - next.orderField
        );
    },
    getTarget(id) {
      return "{target:'#subsystemInfo-" + id + "'}";
    },
    getDownloadLink(document) {
      return `/api/v1/file/download/${document.file}`;
    },
    setType(type) {
      this.type = type;
    },
    getCategories(id) {
      return this.categories.filter(
        x => x.distributive && x.distributive.id === id
      );
    },
    goToSubsystem(id) {
      this.type = "list";
      this.$nextTick(function() {
        this.$refs["subsystem" + id][0].scrollIntoView();
        this.$refs["subsystem" + id][0].querySelector('#subsystemInfo-'+id).classList.remove("uk-hidden")
        this.changeArrow(id)
        window.scrollBy(0, -45);
      });
    },
    goToDist(id,subsystem) {
      this.type = "list";
      this.$nextTick(function() {
        this.changeArrow(subsystem)
        this.$refs["subsystem" + subsystem][0].querySelector('#subsystemInfo-'+subsystem).classList.remove("uk-hidden")
        this.$refs["dist" + id][0].scrollIntoView();
        window.scrollBy(0, -45);
      });
    },
    changeArrow(id){
        this.$nextTick(function() {
            let icon = this.$refs["subsystem" + id][0].querySelector('h3 i.uk-icon-angle-right')
            if(icon){
                if(this.$refs["subsystem" + id][0].querySelector('#subsystemInfo-'+id).classList.contains('uk-hidden')){
                    icon.classList.remove('active')
                }else{
                    icon.classList.add('active')
                }
            }
      });
    }
  }
};
</script>

<style scoped lang="scss">
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

h3.subsystem-title {
  font-family: Arial, Helvetica, sans-serif;
  padding: 10px;
  background-color: #29477f;
  color: #fff;
  margin: 0;
  font-size: 16px;
  margin-bottom: 2px;
}

h3.subsystem-title.have-dist {
  cursor: pointer;
}

h3.subsystem-title.have-dist:hover {
  background-color: rgb(67, 97, 153);
}

h3.subsystem-title > div {
  float: right;
  transform: rotate(180deg);
}

.dist-item {
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
    /*text-align: center;*/
  }
  &_description {
    display: flex;
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
  &_category_title {
    margin: 0;
    padding-left: 10px;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    color: #444;
    font-size: 16px;
    align-items: center;
    margin: 10px 0;
    padding-top: 20px;
    /*&:before,
    &:after {
      content: "";
      margin: 0 10px;

      display: inline-block;
      height: 1px;
      background-color: black;
      width: 50px;
    }*/
  }
  &_category_table {
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
    margin-bottom: 10px;
    tr {
      td {
        padding: 10px;
        border: 1px dotted #ddd;
        font-size: 14px;
      }
    }
  }
}

.table-blue thead th {
  text-align: center;
  vertical-align: middle;
  border: #fff 1px solid;
}

.table-blue #files thead th {
  text-align: left;
}

.table-blue table td {
    border: #ddd 1px solid;
}

.table-blue {
  overflow-x: auto;
}
.table-blue table {
  font-size: 12px;
}

.dist h4 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>


