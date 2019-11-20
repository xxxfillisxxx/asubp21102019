<template>
  <at-modal :value="value" @on-cancel="onCancel">
    <div slot="header">{{ title }}</div>
    <form ref="form" @submit.prevent="onConfirm">
      <div class="row at-row" v-for="field in schema" :key="field.key">
        <template v-if="!field.hidden">
          <div class="col-md-8">
            <label>{{ field.title }}</label>
          </div>
          <div class="col-md-16">
            <input-component
              :ref="field.key"
              :field="field"
              :model="model"
              v-model="model[field.key]"
            />
          </div>
        </template>
      </div>
    </form>
    <div slot="footer">
      <at-button type="primary" @click="onConfirm">Сохранить</at-button>
      <at-button @click="onCancel">Отменить</at-button>
    </div>
  </at-modal>
</template>

<script>
import AtInputCustom from "~/components/atInputCustom.vue";
import inputComponent from "~/components/inputComponent";

const createModel = m =>
  m.reduce((acc, el) => {
    acc[el.key] = el.value;
    return acc;
  }, {});

export default {
  props: ["schema", "value", "title"],
  watch: {
    schema(value) {
      this.model = createModel(this.schema);
    },
    value(v) {
      if (!!v) {
        try {
          const input = this.$refs[
            this.schema.filter(s => !s.hidden)[0].key
          ][0].$el.querySelector("input");
          input.focus();
        } catch (error) {
          console.error(error);
        }
      }
    }
  },
  mounted() {
    this.model = createModel(this.schema);
  },
  data() {
    return {
      model: {}
    };
  },
  computed: {
    modelEntries() {
      return this.schema;
    },
    isCreating() {
      return this.model.id === 0;
    }
  },
  methods: {
    onCancel() {
      this.onClosingModal();
    },
    onClosingModal() {
      this.$emit("input", false);
      this.model = createModel(this.schema);
    },
    onConfirm() {
      const form = this.$refs.form;
      if (!form.checkValidity()) {
        form.reportValidity();
      } else {
        this.$emit("submit", this.model);
        this.onClosingModal();
      }
    }
  },
  components: {
    AtInputCustom,
    inputComponent
  }
};
</script>

<style scoped>
.row {
  margin-bottom: 10px;
}

.hidden {
  display: none;
}
</style>