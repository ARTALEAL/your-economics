<template>
  <nav class="navbar purple lighten-3">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('navbar-click')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ dateFilter }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i
                >{{ localize('ProfileTitle') }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i
                >{{ localize('logOut') }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { auth } from '@/firebase';
import store from '@/store';
import localize from '@/utils/localize';
export default {
  data() {
    return {
      date: new Date(),
      interval: null,
      dropdown: null,
      format: 'date-time',
    };
  },
  methods: {
    localize,
    async logout() {
      console.log('logout');
      await this.$store.dispatch('logout');
      this.$router.push('/login?message=logout');
    },
  },
  async mounted() {
    this.interval = setInterval(() => (this.date = new Date()), 1000);
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
    });

    if (auth.currentUser) {
      await this.$store.dispatch('fetchInfo');
    }
  },
  beforeUnmount() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
  computed: {
    name: {
      get() {
        if (this.$store.getters.info.name) {
          return this.$store.getters.info.name;
        }
      },
    },
    dateFilter: {
      get(value, format = this.format) {
        const options = {};
        const locale = store.getters.info.locale || 'ru-RU';
        if (format.includes('date')) {
          options.day = '2-digit';
          options.month = 'long';
          options.year = 'numeric';
        }
        if (format.includes('time')) {
          options.hour = '2-digit';
          options.minute = '2-digit';
          options.second = '2-digit';
        }
        return new Intl.DateTimeFormat(locale, options).format(this.date);
      },
    },
  },
};
</script>

<style></style>
