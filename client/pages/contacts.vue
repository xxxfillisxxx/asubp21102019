<template>
  <div class="block-content contacts">
    <h2>Контакты</h2>
    <p
      class="uk-text-center"
    >Техническое сопровождение АСУБП Сахалинской области осуществляет ООО "Кейсистемс" (гор. Чебоксары)</p>
    <p class="uk-text-center">Контакты компании "Кейсистемс" в Сахалинской области:</p>
    <template v-for="subsystem in subsystemsFilter">
        <div v-if="subsystem.contacts.length>0" :key="subsystem.id"  class="contacts-group">
      <h4
        class="uk-text-center caption click_head"
        :data-uk-toggle="getTarget(subsystem.id)"
      >{{subsystem.name}}</h4>
      <div class="block-bg" :class="!subsystemId ? 'uk-hidden':''" :id="'contacts-'+subsystem.id">
        <div class="uk-grid uk-grid-collapse group">
          <div v-for="contact in subsystem.contacts" :key="contact.id" class="uk-width-medium-1-2 uk-width-1-1 margin-bottom-4">
            <p v-if="contact.position">
              <u>{{contact.position}}</u>
            </p>
            <ul>
              <li class="name" :class="contact.isFemale?'woman':''" v-if="contact.name">{{contact.name}}</li>
              <li class="phone" v-if="contact.phone">{{contact.phone}}</li>
              <li class="acq" v-if="contact.icq">{{contact.icq}}</li>
              <li class="mail" v-if="contact.email">
                  <a :href="'mailto:'+contact.email">{{contact.email}}</a>
              </li>
              <li class="service" v-if="contact.linkService">
                  <a :href="contact.linkService">Сервис учета обращений</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </template>
    
  </div>
</template>
<script>

import { actionNames } from "@/store/default/-actions";
import { mapGetters, mapActions } from "vuex";

const storeName = "contacts";
export default {
  name: "ContactsPage",
  async fetch({ store, params }) {
    await store.dispatch(`subsystems/${actionNames.GET_ITEMS_FRONTEND}`);
  },

  data() {
    return {
      type: "list",
      subsystemId:this. $route.query.subsystem
    };
  },

  computed: {
    ...mapGetters({
      subsystems: `subsystems/data`,
      data: `${storeName}/data`,
      count: `${storeName}/count`
    }),
    subsystemsFilter(){
        return this.subsystems.filter(subs=>subs.id==this.subsystemId||!this.subsystemId)
    }
  },
  methods: {  
      getTarget(id) {
      return "{target:'#contacts-" + id + "'}";
    },  
  }
};
</script>
<style scoped lang="scss">
    .margin-bottom-4{
        margin-bottom:40px;
    }
</style>

