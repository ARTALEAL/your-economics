<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ currencyFilter(info.bill) }}</h4>
    </div>
    <loader v-if="isLoading" />
    <p class="center" v-else-if="!categories.length">
      У вас пока нет категорий.
      <router-link to="/categories">Добавить новую категорию</router-link>
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
        tooltipValue < 0 ? 'Лимит превышен на' : 'Осталось'
      } ${Math.abs(tooltipValue)} руб.`;
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
    currencyFilter(value, currency = 'RUB') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
      }).format(value);
    },
  },
};
</script>
