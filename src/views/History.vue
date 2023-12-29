<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <Pie v-if="rendered" :data="chartData" :options="options" ref="chart" />
      <p v-else class="center">Загрузка графика...</p>
    </div>
    <loader v-if="isLoading" />
    <p class="center" v-else-if="!records.length">
      У вас пока нет записей.<router-link to="/record">
        Хотите добавить первую запись?</router-link
      >
    </p>
    <section v-else>
      <history-table :records="items" />
      <paginate
        v-model="page"
        :page-count="totalPages"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперёд'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      ></paginate>
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue';
import Loader from '@/components/app/Loader.vue';
import paginationMixin from '@/mixins/pagination.mixin';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Chart } from 'chart.js';
import { Pie } from 'vue-chartjs';
import colors from '@/utils/colorsGenerator';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: 'history',
  mixins: [paginationMixin],
  data() {
    return {
      isLoading: true,
      records: [],
      categories: [],
      rendered: false,
      chartData: null,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  components: { HistoryTable, Loader, Pie },
  async mounted() {
    try {
      this.records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetcCategories');
      this.setupPagination(
        this.records.map((record) => {
          return {
            ...record,
            categoryName: categories.find((c) => c.id === record.id).name,
            recordType: record.type === 'income' ? 'green' : 'red',
            recordText: record.type === 'income' ? 'Доход' : 'Расход',
          };
        })
      );
      console.log('sss', this.records);
      this.chartData = {
        labels: categories.map((c) => c.name),
        datasets: [
          {
            label: 'Расходы по категориям',
            backgroundColor: colors,
            data: categories.map((c) => {
              return this.records.reduce((acc, rec) => {
                if (rec.id === c.id && rec.type === 'outcome') {
                  acc += rec.amount;
                }
                return acc;
              }, 0);
            }),
          },
        ],
      };
      this.rendered = true;
      this.isLoading = false;
    } catch (error) {}
  },
};
</script>
