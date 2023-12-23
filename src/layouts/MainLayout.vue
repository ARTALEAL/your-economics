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
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/app/SideBar.vue';
import NavBar from '@/components/app/NavBar.vue';
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
};
</script>
