<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('ProfileTitle') }}</h3>
    </div>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid: v$.name.$error,
          }"
          @blur="v$.name.$touch"
        />
        <label for="description">{{ localize('nameInput') }}</label>
        <span class="helper-text invalid" v-if="v$.name.required.$invalid">{{
          localize('inputErrorReq')
        }}</span>
      </div>
      <div class="switch">
        <label>
          En
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Ru
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{ localize('updateBtn') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import localize from '@/utils/localize';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'profile',
  data() {
    return {
      name: '',
      isRuLocale: true,
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-RU';
    setTimeout(() => M.updateTextFields());
  },
  computed: {
    ...mapGetters(['info']),
  },
  validations() {
    return {
      name: { required },
    };
  },
  methods: {
    localize,
    ...mapActions(['updateInfo']),
    async handleSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        console.log('invalid');
        return;
      }
      const formData = {
        name: this.name,
        isRuLocale: this.isRuLocale,
      };

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US',
        });
      } catch (error) {}
    },
  },
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
