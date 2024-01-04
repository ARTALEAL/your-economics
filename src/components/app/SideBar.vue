<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <li v-for="item in links" :key="item.name">
      <router-link
        :to="item.route"
        active-class="active"
        href="#"
        class="waves-effect waves-orange pointer"
        >{{ item.title }}</router-link
      >
    </li>
  </ul>
</template>

<script>
import localize from '@/utils/localize';
export default {
  props: ['isOpen'],
  methods: {
    localize,
  },
  data() {
    return {
      links: [
        { route: '/', title: localize('bill') },
        { route: '/history', title: localize('history') },
        { route: '/planning', title: localize('planning') },
        { route: '/record', title: localize('newRecord') },
        { route: '/categories', title: localize('categoriesTitle') },
      ],
    };
  },
  mounted() {
    this.$store.watch(
      (state, getters) => getters.info,
      (newValue, oldVale) => {
        this.links = [
          { route: '/', title: localize('bill') },
          { route: '/history', title: localize('history') },
          { route: '/planning', title: localize('planning') },
          { route: '/record', title: localize('newRecord') },
          { route: '/categories', title: localize('categoriesTitle') },
        ];
      }
    );
  },
};
</script>

<style></style>
