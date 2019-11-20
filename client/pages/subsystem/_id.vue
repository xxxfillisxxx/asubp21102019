<template>
  <div class="block-content">
    <h2>{{ subsystem.name }}</h2>
    <ul class="v-tabs">
      <li :class="{ active: type === 'main' }" @click="setType('main')">Основная информация</li>
      <li :class="{ active: type === 'faq' }" @click="setType('faq')">{{ subsystem.faq.title }}</li>
    </ul>
    <div v-if="type === 'main'" class="dist">
      <div class="uk-grid uk-grid-collapse uk-text-center docs">
        <div class="doc">
          <table
            class="uk-table uk-table-hover uk-table-striped"
            v-for="category in subsystem.categories"
            :key="category.id"
          >
            <caption>{{ category.name }}</caption>
            <thead>
              <tr>
                <th>№</th>
                <th>Наименование</th>
                <th>Дата публикации</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="document in category.documents" :key="document.id">
                <td>{{ document.orderField }}</td>
                <td>
                  <a :href="getOpenLink(document)">{{ document.name }}</a><br>
                  <span class="description">{{ document.description }}</span>
                </td>
                <td>{{ new Date(document.publishedAt).toLocaleString().slice(0, 10) }}</td>
                <td>
                  <a :href="getDownloadLink(document)">Загрузить</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-if="type === 'faq'" class="dist">
      <div v-html="subsystem.faq.body" style="margin: 20px;" id="faq"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { actionNames } from "@/store/default/-actions";

const storeName = "categories";

export default {
  async asyncData({ store, params }) {
    const id = Number.parseInt(params.id);
    const subsystem = await store.dispatch(
      `subsystems/${actionNames.GET_ITEM}`,
      { id }
    );
    for (const category of subsystem.categories) {
      const id = Number.parseInt(category.id);
      store.dispatch(`${storeName}/${actionNames.UPDATE_CRITERIA}`, { id });
      await store.dispatch(`${storeName}/${actionNames.GET_ITEMS_FRONT}`);
      category.documents = store.getters[`${storeName}/data`][0].documents;
      category.documents.sort(
        (prev, next) => prev.orderField - next.orderField
      );
    }
    subsystem.categories.sort(
      (prev, next) => prev.orderField - next.orderField
    );
    return { subsystem };
  },
  /*async fetch({ store, params }) {
        const id = Number.parseInt(params.id)
        store.dispatch(`${storeName}/${actionNames.UPDATE_CRITERIA}`, { id })
        await store.dispatch(`${storeName}/${actionNames.GET_ITEMS}`)
        console.log(store.getters[`${storeName}/data`])
         console.log(store.getters[`${storeName}/count`])
    },*/
  data() {
    return {
      type: "main"
    };
  },
  computed: {
    /* ...mapGetters({
                data: `${storeName}/data`,
                count: `${storeName}/count`
            }),*/
  },
  // computed: {
  //     sortedCategories() {
  //         const sortByOrderField = (i1, i2) => i1.orderField - i2.orderField
  //         const categories = [...this.categories]
  //         categories.sort(sortByOrderField)
  //         categories.forEach(category => category.documents.sort(sortByOrderField))
  //         return categories
  //     }
  //},
  methods: {
    setType(type) {
      this.type = type;
    },
    getDownloadLink(document) {
      return `/api/v1/file/download/${document.file}`;
    },
    getOpenLink(document) {
      return this.getDownloadLink(document) + `/${document.file.filename}`;
    }
  }
};
</script>


<style scoped>
.uk-table td {
  text-align: left;
}
.uk-table td:nth-child(1){
    width: 40px;
}
.uk-table td:nth-child(3){
  width:170px;
  font-size: 14px;
}
.uk-table td:nth-child(4){
  width:100px;
}
.uk-table thead tr {
  background-color: #eee;
}

.uk-table tbody tr:nth-child(2n) {
  background-color: #eee;
}
.uk-table tbody tr:hover {
  background-color: rgb(223, 233, 252);
}
.docs {
  margin: 0;
}

.doc{
    width:100%;
    overflow-x: auto;
}

.block-content,
h3 {
  margin-left: 20px;
  margin-right: 20px;
}
.uk-table caption {
  color: #fff;
  font-style: initial;
  font-size: 16px;
  padding: 10px;
  background-color: #29477f;
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

ul.v-tabs li.active {
  background-color: white;
  border-width: 2px;
  border-top: 2px solid #29477f;
}
.description{
    font-style: italic;
    font-size: 14px;
}
</style>

<style lang="scss">
#faq {
  background-color: #fff;
  color: #3f536e;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica,
    "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1",
    Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  word-wrap: break-word;
  overflow: hidden;
  b,
  strong {
    font-weight: bolder;
  }
  h3 {
    font-size: 16px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
    font-weight: bold;
    line-height: 1.5;
    text-align: left;
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
  h2 {
    font-size: 18px;
  }
  h2 {
    margin-bottom: 20px;
  }
  h3,
  h4 {
    margin-bottom: 10px;
  }
  p {
    margin: 0;
    padding: 0;
  }
  .table table {
    margin: auto;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px double #b3b3b3;
    text-align: left;
    td,
    th {
      min-width: 2em;
      padding: 0.4em;
      border: 1px solid #d9d9d9;
    }
  }
  a {
    color: #6190e8;
    background: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  .image.image-style-side {
    float: right;
    margin-left: 1.5em;
    max-width: 50%;
  }
  .image {
    clear: both;
    text-align: center;
    margin: 1em 0;
    position: relative;
    overflow: hidden;
  }
}
</style>

