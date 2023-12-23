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
export default {
  props: ['isOpen'],
  data() {
    return {
      links: [
        { route: '/', title: 'Счёт' },
        { route: '/history', title: 'История' },
        { route: '/planning', title: 'Планирование' },
        { route: '/record', title: 'Новая запись' },
        { route: '/categories', title: 'Категории' },
      ],
    };
  },
};
</script>

<style></style>
