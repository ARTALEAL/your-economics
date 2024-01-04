<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ localize('editCategoryTitle') }}</h4>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="input-field">
          <select ref="select" v-model="currentCategory">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
          <label>{{ localize('editCategorySelect') }}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="name"
            :class="{ invalid: v$.name.$error }"
            @blur="v$.name.$touch"
          />
          <label for="name">{{ localize('createCategoryName') }}</label>
          <span class="helper-text invalid" v-if="v$.name.$error">{{
            localize('createCategoryNameError')
          }}</span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$error }"
            @blur="v$.limit.$touch"
          />
          <label for="limit">{{ localize('inputLimitPlaceholder') }}</label>
          <span class="helper-text invalid" v-if="v$.limit.$error"
            >{{ localize('inputLimit') }} {{ v$.limit.minValue.$params.min }}
            {{ localize('inputLimitCurrency') }}.</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ localize('updateBtn') }}
          <i class="material-icons right">send</i>
        </button>
        <!-- <button
          class="btn waves-effect red darken-4 delete-btn"
          @click.prevent="handleDelete"
        >
          Удалить категорию
        </button> -->
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
import localize from '@/utils/localize';
export default {
  name: 'categoryEdit',
  data() {
    return {
      select: null,
      name: '',
      limit: '',
      currentCategory: null,
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  props: {
    categories: {
      type: Array,
      default: [],
    },
  },
  created() {
    const { name, limit, id } = this.categories[0];
    this.name = name;
    (this.currentCategory = id), (this.limit = limit);
  },
  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  watch: {
    currentCategory(value) {
      const { name, limit } = this.categories.find((cat) => cat.id === value);
      (this.name = name), (this.limit = limit);
    },
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.unmount;
    }
  },
  validations() {
    return {
      name: { required },
      limit: { required, minValue: minValue(1) },
    };
  },
  methods: {
    localize,
    async handleSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch;
        return;
      }
      const formData = {
        id: this.currentCategory,
        name: this.name,
        limit: this.limit,
      };
      try {
        await this.$store.dispatch('updateCategory', formData);
        this.$message(localize('editCategoryMessage'));
        this.$emit('updated', formData);
      } catch (error) {}
    },
    // async handleDelete() {
    //   try {
    //     console.log('delete', this.currentCategory);
    //     this.$error('Доделать!!!');
    //   } catch (error) {}
    // },
  },
};
</script>

<style></style>
