<template>
  <form class="card auth-card" @submit.prevent="handleSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          v-model.trim="email"
          id="email"
          type="text"
          class="validate"
          :class="{
            invalid:
              (v$.email.$dirty && !v$.email.$required) ||
              (v$.email.$dirty && !v$.email.email),
          }"
        />
        <label for="email">Email</label>
        <small v-if="!v$.email.$required" class="helper-text invalid"
          >Введите email</small
        >
        <small v-else-if="!v$.email.$email" class="helper-text invalid"
          >Введите корректный email</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          v-model="password"
          type="password"
          class="validate"
          :class="{
            invalid:
              (v$.password.$dirty && !v$.password.$required) ||
              (v$.password.$dirty && !v$.password.minLength),
          }"
        />
        <label for="password">Пароль</label>
        <small
          v-if="v$.password.$dirty && !v$.password.$required"
          class="helper-text invalid"
          >Введите пароль</small
        >
        <small
          v-else-if="v$.password.$dirty && !v$.password.minLength"
          class="helper-text invalid"
          >Пароль должен быть не меньше 6-ти символов</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  validations() {
    return {
      email: { email, required },
      password: { minLength: minLength(6), required },
    };
  },
  methods: {
    async handleSubmit() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      this.$router.push('/');
    },
    // handleSubmit() {
    //   if (this.v$.$invalid) {
    //     this.v$.$touch();
    //     return;
    //   }
    //   this.$router.push('/');
    // },
  },
};
</script>
