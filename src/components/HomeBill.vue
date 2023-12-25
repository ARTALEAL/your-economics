<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p class="currency-line" v-for="currency in currencies" :key="currency">
          <span>{{ getCurrency(currency) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rates: Object,
  },
  data() {
    return {
      currencies: ['RUB', 'USD', 'EUR'],
    };
  },
  computed: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
      );
    },
  },
  methods: {
    currencyFilter(value, currency = 'RUB') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
      }).format(value);
    },
    getCurrency(currency) {
      const sum = Math.floor(this.base * this.rates[currency]);
      return this.currencyFilter(sum, currency);
    },
  },
};
</script>

<style></style>
