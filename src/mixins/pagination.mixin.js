import _ from 'lodash';
export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 5,
      totalPages: 0,
      allItems: [],
      items: [],
    };
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize);
      this.totalPages = this.allItems.length;
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
    pageChangeHandler(pageNum) {
      this.$router.push(`${this.$route.path}?page=${pageNum}`);
      this.page = pageNum;
      this.items = this.allItems[this.page - 1] || this.allItems[0];
      console.log(this.items);
    },
  },
};
