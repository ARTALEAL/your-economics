<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader v-if="isLoading" />
      <div v-else class="row">
        <category-create @created="addNewCategory" />
        <category-edit :categories="categories" />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue';
import CategoryEdit from '@/components/CategoryEdit.vue';
import Loader from '@/components/app/Loader.vue';

export default {
  name: 'categories',
  components: { CategoryCreate, CategoryEdit, Loader },
  data() {
    return {
      categories: [],
      isLoading: true,
    };
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
      console.log(this.categories);
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetcCategories');
    this.isLoading = false;
  },
};
</script>
