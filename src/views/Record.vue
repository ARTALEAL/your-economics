<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('newRecord') }}</h3>
    </div>
    <loader v-if="isLoading" />
    <p class="center" v-else-if="!categories.length">
      {{ localize('categoriesEmptyMessage') }}
      <router-link to="/categories">{{
        localize('createCategory')
      }}</router-link>
    </p>
    <form class="form" v-else @submit.prevent="handleSubmit">
      <div class="input-field">
        <select ref="select" v-model="currentCategory">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <label>{{ localize('editCategorySelect') }}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{ localize('income') }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{ localize('outcome') }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: v$.amount.$error }"
          @blur="v$.amount.$touch"
        />
        <label for="amount">{{ localize('amount') }}</label>
        <span class="helper-text invalid" v-if="v$.amount.$error"
          >{{ localize('inputLimit') }} {{ v$.amount.minValue.$params.min }}
          {{ localize('inputLimitCurrency') }}.</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{ invalid: v$.description.$error }"
          @blur="v$.description.$touch"
        />
        <label for="description">{{ localize('description') }}</label>
        <span class="helper-text invalid" v-if="v$.description.$error">{{
          localize('descriptionError')
        }}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ localize('createBtn') }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from '@/components/app/Loader.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';
import { mapGetters } from 'vuex';
import localize from '@/utils/localize';

export default {
  name: 'record',
  setup: () => ({ v$: useVuelidate() }),
  components: { Loader },
  data() {
    return {
      isLoading: true,
      categories: [],
      select: null,
      currentCategory: null,
      type: 'outcome',
      amount: '',
      description: '',
    };
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetcCategories');
    this.isLoading = false;
    if (this.categories.length) {
      this.currentCategory = this.categories[0].id;
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
    }, 0);
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.unmount;
      console.log('unmount');
    }
  },
  validations() {
    return {
      description: { required },
      amount: { required, minValue: minValue(1) },
    };
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }
      return this.info.bill >= this.amount;
    },
  },
  methods: {
    localize,
    async handleSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch;
        return;
      }
      const formData = {
        description: this.description,
        amount: this.amount,
        id: this.currentCategory,
        type: this.type,
        date: new Date().toJSON(),
      };

      try {
        if (this.canCreateRecord) {
          await this.$store.dispatch('createRecord', formData);
          const bill =
            this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount;
          await this.$store.dispatch('updateInfo', { bill });
          this.$message(localize('successMessage'));
          this.v$.$reset();
          this.amount = '';
          this.description = '';
        } else {
          this.$message(
            `${localize('recordErrorMessage')} ${
              this.amount - this.info.bill
            } ${localize('recordErrorMessageCur')}`
          );
        }
      } catch (error) {}
    },
  },
};
</script>
