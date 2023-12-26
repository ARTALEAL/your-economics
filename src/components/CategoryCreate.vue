<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="name"
            :class="{ invalid: v$.name.$error }"
            @blur="v$.name.$touch"
          />
          <label for="name">Название</label>
          <span class="helper-text invalid" v-if="v$.name.$error"
            >Введите название категории</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: v$.limit.$error }"
            @blur="v$.limit.$touch"
          />
          <label for="limit">Лимит</label>
          <span class="helper-text invalid" v-if="v$.limit.$error"
            >Минимальная сумма {{ v$.limit.minValue.$params.min }} руб.</span
          >
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
export default {
  name: 'categoryCreate',
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      name: '',
      limit: '',
    };
  },
  validations() {
    return {
      name: { required },
      limit: { required, minValue: minValue(1) },
    };
  },
  methods: {
    async handleSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        console.log('invalid');
        return;
      }
      const formData = {
        name: this.name,
        limit: this.limit,
      };

      try {
        const category = await this.$store.dispatch('createCategory', formData);
        console.log(category);
        // this.$router.push('/');
        this.name = '';
        this.limit = '';
      } catch (error) {}
    },
  },
};
</script>

<style></style>
