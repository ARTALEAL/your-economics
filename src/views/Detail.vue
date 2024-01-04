<template>
  <div>
    <loader v-if="isLoading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{
          localize('history')
        }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{
            record.type === 'outcome' ? localize('outcome') : localize('income')
          }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="record.type === 'outcome' ? 'red' : 'green'"
          >
            <div class="card-content white-text">
              <p>{{ localize('description') }}: {{ record.description }}</p>
              <p>
                {{ localize('amount') }}: {{ currencyFilter(record.amount) }}
              </p>
              <p>{{ localize('category') }}: {{ record.category }}</p>

              <small>{{
                formatDate(new Date(record.date), 'date-time')
              }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>{{ localize('noRecord') }}</p>
  </div>
</template>

<script>
import Loader from '@/components/app/Loader.vue';
import localize from '@/utils/localize';
import store from '@/store';
import { mapGetters } from 'vuex';
export default {
  components: { Loader },
  name: 'detail',
  data() {
    return {
      isLoading: true,
      record: null,
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch('fetchRecord', id);
    const category = await this.$store.dispatch('fetcCategory', record.id);
    this.record = {
      ...record,
      category: category.name,
    };
    console.log(this.record);
    this.isLoading = false;
  },
  methods: {
    localize,
    currencyFilter(value, currency = 'RUB') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
      }).format(value);
    },
    formatDate(value, format) {
      const locale = store.getters.info.locale || 'ru-RU';
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
      return new Intl.DateTimeFormat(locale, options).format(value);
    },
  },
};
</script>
