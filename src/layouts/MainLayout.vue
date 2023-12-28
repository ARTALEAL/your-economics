<template>
  <div>
    <article v-if="isLoading">
      <loader />
      <p class="center">Загрузка данных...</p>
    </article>
    <div class="app-main-layout" v-else>
      <nav-bar @navbar-click="isOpen = !isOpen" />
      <side-bar :isOpen="isOpen" />
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          v-tooltip="'Добавить запись'"
          to="/record"
          class="btn-floating btn-large blue"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/app/SideBar.vue';
import NavBar from '@/components/app/NavBar.vue';
import messages from '@/utils/messages';
import Loader from '@/components/app/Loader.vue';
export default {
  name: 'main-layout',
  components: {
    SideBar,
    NavBar,
    Loader,
  },
  data() {
    return {
      isOpen: true,
      isLoading: true,
    };
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
      this.isLoading = false;
    }
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError] || 'Что-то пошло не так');
    },
  },
};
</script>
