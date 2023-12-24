<template>
  <form class="card auth-card" @submit.prevent="handleSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          v-model.trim="email"
          id="email"
          type="text"
          :class="{
            invalid: v$.email.$error,
          }"
          @blur="v$.email.$touch"
        />
        <label for="email">Email</label>
        <small
          v-if="v$.email.required.$invalid && v$.email.$error"
          class="helper-text invalid"
          >Введите email</small
        >
        <small
          v-else-if="v$.email.email.$invalid && v$.email.$error"
          class="helper-text invalid"
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
            invalid: v$.password.$error,
          }"
          @blur="v$.password.$touch"
        />
        <label for="password">Пароль</label>
        <small
          v-if="v$.password.required.$invalid && v$.password.$dirty"
          class="helper-text invalid"
          >Введите пароль</small
        >
        <small
          v-else-if="
            v$.password.minLength.$invalid && !v$.password.required.$invalid
          "
          class="helper-text invalid"
          >Пароль должен быть минимум
          {{ v$.password.minLength.$params.min }} символов, сейчас
          {{ password.length }}</small
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
import messages from '@/utils/messages';

export default {
  name: 'login',
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      email: '',
      password: '',
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(6) },
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
        email: this.email,
        password: this.password,
      };

      try {
        await this.$store.dispatch('login', formData);
        this.$router.push('/');
      } catch (error) {}

      console.log(formData);
    },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message]);
    }
  },
};
</script>
