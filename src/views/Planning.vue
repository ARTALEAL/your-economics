<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('planning') }}</h3>
      <h4>{{ currencyFilter(info.bill) }}</h4>
    </div>
    <loader v-if="isLoading" />
    <p class="center" v-else-if="!categories.length">
      {{ localize('emptyPlanning') }}
      <router-link to="/categories">{{ localize('addCategory') }}</router-link>
    </p>
    <section v-else>
      <div v-for="category in categories" :key="category.id">
        <p>
          <strong>{{ category.name }}:</strong>
          {{ currencyFilter(category.spending) }} из
          {{ currencyFilter(category.limit) }}
        </p>
        <div class="progress" v-tooltip="category.tooltipText">
          <div
            class="determinate"
            :class="[category.progressColor]"
            :style="{ width: category.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loader from '@/components/app/Loader.vue';
import { mapGetters } from 'vuex';
import localize from '@/utils/localize';
export default {
  components: { Loader },
  name: 'planning',
  data() {
    return {
      isLoading: true,
      categories: [],
    };
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categories = await this.$store.dispatch('fetcCategories');
    this.categories = categories.map((cat) => {
      const spending = records
        .filter((rec) => rec.id === cat.id)
        .filter((rec) => rec.type === 'outcome')
        .reduce((acc, cur) => {
          return (cur.amount += acc);
        }, 0);
      const percent = (100 * spending) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 70 ? 'green' : percent < 100 ? 'yellow' : 'red';
      const tooltipValue = cat.limit - spending;
      const tooltipText = `${
        tooltipValue < 0
          ? `${localize('limitExceeded')}`
          : `${localize('left')}`
      } ${Math.abs(tooltipValue)} ${localize('inputLimitCurrency')}.`;
      return {
        ...cat,
        progressColor,
        progressPercent,
        spending,
        tooltipText,
      };
    });
    console.log(this.categories);
    this.isLoading = false;
  },
  computed: {
    ...mapGetters(['info']),
  },
  methods: {
    localize,
    currencyFilter(value, currency = 'RUB') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
      }).format(value);
    },
  },
};
</script>
