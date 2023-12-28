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
      <history-table :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable.vue';
import Loader from '@/components/app/Loader.vue';
export default {
  name: 'history',
  data() {
    return {
      isLoading: true,
      records: [],
      categories: [],
    };
  },
  components: { HistoryTable, Loader },
  async mounted() {
    // this.records = await this.$store.dispatch('fetchRecords');
    const records = await this.$store.dispatch('fetchRecords');
    this.categories = await this.$store.dispatch('fetcCategories');
    this.records = records.map((record) => {
      return {
        ...record,
        categoryName: this.categories.find((c) => c.id === record.id).name,
        recordType: record.type === 'income' ? 'green' : 'red',
        recordText: record.type === 'income' ? 'Доход' : 'Расход',
      };
    });
    this.isLoading = false;
  },
};
</script>
