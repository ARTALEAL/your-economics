<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>{{ localize('amount') }}</th>
        <th>{{ localize('date') }}</th>
        <th>{{ localize('category') }}</th>
        <th>{{ localize('type') }}</th>
        <th>{{ localize('open') }}</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, index) in records" :key="record.recordId">
        <td>{{ index + 1 }}</td>
        <td>{{ currencyFilter(record.amount) }}</td>
        <td>{{ new Date(record.date).toLocaleString() }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.recordType]">{{
            localize(record.type)
          }}</span>
        </td>
        <td>
          <button
            class="btn-small btn"
            @click="$router.push(`/detail/${record.recordId}`)"
            v-tooltip="localize('moreInfo')"
          >
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import localize from '@/utils/localize';
export default {
  name: 'history-table',
  props: {
    records: {
      type: Array,
      required: true,
    },
  },
  methods: {
    localize,
    currencyFilter(value, currency = 'RUB') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
      }).format(value);
    },
  },
};
</script>
