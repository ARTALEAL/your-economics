<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
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

export default {
  name: 'history',
  mixins: [paginationMixin],
  data() {
    return {
      isLoading: true,
      records: [],
    };
  },
  components: { HistoryTable, Loader },
  async mounted() {
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
    this.isLoading = false;
  },
  methods: {},
};
</script>
