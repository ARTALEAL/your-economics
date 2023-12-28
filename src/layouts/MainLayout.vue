<template>
  <div class="app-main-layout">
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
</template>

<script>
import SideBar from '@/components/app/SideBar.vue';
import NavBar from '@/components/app/NavBar.vue';
import messages from '@/utils/messages';
export default {
  name: 'main-layout',
  components: {
    SideBar,
    NavBar,
  },
  data() {
    return {
      isOpen: true,
    };
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
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
