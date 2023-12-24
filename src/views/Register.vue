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
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model.trim="name"
          class="validate"
          :class="{ invalid: v$.name.$error }"
          @blur="v$.name.$touch"
        />
        <label for="name">Имя</label>
        <small v-if="v$.name.$error" class="helper-text invalid"
          >Введите ваше имя</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>С правилами согласен</span>
          <small v-if="v$.agree.$error" class="helper-text invalid">
            (Нужно ваше согласие)</small
          >
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
export default {
  name: 'register',
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      email: '',
      password: '',
      name: '',
      agree: false,
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(6) },
      name: { required, minLength: minLength(1) },
      agree: { checked: (v) => v },
    };
  },
  methods: {
    handleSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        console.log('invalid');
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      this.$router.push('/');
      console.log(formData);
    },
  },
};
</script>
