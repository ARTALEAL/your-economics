<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Курс валют</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{ localize('currency') }}</th>
              <th>{{ localize('rate') }}</th>
              <th>{{ localize('date') }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="currency in currencies" :key="currency">
              <td>{{ currency }}</td>
              <td>{{ rates[currency].toFixed(2) }}</td>
              <td>{{ dateFilter(date) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import localize from '@/utils/localize';
import store from '@/store';
export default {
  props: {
    rates: Object,
    date: String,
  },
  data() {
    return {
      currencies: ['RUB', 'USD', 'EUR', 'TRY'],
      format: 'date',
    };
  },
  methods: {
    localize,
    dateFilter(value, format = this.format) {
      const locale = store.getters.info.locale || 'ru-RU';
      const parsed = Date.parse(value);
      const options = {};
      if (format.includes('date')) {
        options.day = '2-digit';
        options.month = 'long';
        options.year = 'numeric';
      }
      if (format.includes('time')) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.second = '2-digit';
      }
      return new Intl.DateTimeFormat(locale, options).format(parsed);
    },
  },
};
</script>

<style></style>
