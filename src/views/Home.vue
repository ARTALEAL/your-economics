<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('bill') }}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <loader v-if="isLoading" />
    <div class="row" v-else>
      <home-bill :rates="currency.rates" />
      <home-currency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';
import localize from '@/utils/localize';
export default {
  components: { HomeBill, HomeCurrency },
  data() {
    return {
      isLoading: true,
      currency: null,
    };
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    console.log(this.currency.rates);
    this.isLoading = false;
  },
  methods: {
    localize,
    async refresh() {
      this.isLoading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      console.log(this.currency.rates);
      this.isLoading = false;
    },
  },
};
</script>
