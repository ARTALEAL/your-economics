<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('categoriesTitle') }}</h3>
    </div>
    <section>
      <loader v-if="isLoading" />
      <div v-else class="row">
        <category-create @created="addNewCategory" />
        <category-edit
          :categories="categories"
          @updated="updateCategories"
          :key="categories.length + updateCount"
          v-if="categories.length"
        />
        <p class="center" v-else>{{ localize('categoriesEmptyMessage') }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue';
import CategoryEdit from '@/components/CategoryEdit.vue';
import Loader from '@/components/app/Loader.vue';
import localize from '@/utils/localize';

export default {
  name: 'categories',
  components: { CategoryCreate, CategoryEdit, Loader },
  data() {
    return {
      categories: [],
      isLoading: true,
      updateCount: 0,
    };
  },
  methods: {
    localize,
    addNewCategory(category) {
      this.categories.push(category);
      console.log(this.categories);
    },
    updateCategories(category) {
      const index = this.categories.findIndex((c) => c.id === category.id);
      this.categories[index].name = category.name;
      this.categories[index].limit = category.limit;
      this.updateCount++;
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetcCategories');
    this.isLoading = false;
  },
};
</script>
