<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('historyTitle') }}</h3>
    </div>

    <div class="history-chart">
      <Pie v-if="rendered" :data="chartData" :options="options" ref="chart" />
      <p v-else class="center">{{ localize('historyLoading') }}</p>
    </div>
    <loader v-if="isLoading" />
    <p class="center" v-else-if="!records.length">
      {{ localize('historyEmptyRecords') }}
      <router-link to="/record"> {{ localize('firstRecord') }}</router-link>
    </p>
    <section v-else>
      <history-table :records="items" />
      <paginate
        v-model="page"
        :page-count="totalPages"
        :click-handler="pageChangeHandler"
        :prev-text="localize('prev')"
        :next-text="localize('next')"
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
import localize from '@/utils/localize';

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
  methods: {
    localize,
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
      this.chartData = {
        labels: categories.map((c) => c.name),
        datasets: [
          {
            label: localize('ExpensesCategories'),
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
