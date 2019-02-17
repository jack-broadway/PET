<template>
  <b-card header-class="card-header-button">
    {{ selected_category_name }}
    <template slot="header">
      <div>
        <h3>Category Statistics</h3>
      </div>
      <b-form-group horizontal style="width: 40%">
        <b-form-select v-model="selected_category" :options="category_options"/>
      </b-form-group>
    </template>
    <b-card-body>
      <b-row>
        <b-col md="12">
          <pet-category-yeartodate :chart-options="chartOptions"/>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>
<script>
import controllers from '../../data/controllers'
import moment from 'moment'

import CategorySpendList from '../Categories/CategorySpendList.vue'
import VerticalBarChart from '../Charts/VerticalBarChart'

export default {
  name: 'pet-statistics-monthlyoverview',
  components: {
    'pet-category-spendlist': CategorySpendList,
    'pet-category-yeartodate': VerticalBarChart
  },
  data () {
    return {
      selected_category: null,
      selected_category_name: '',
      category_options: [],
      category_total_expense: [],
      category_total_income: [],
      category_total_names: []
    }
  },
  computed: {
    chartOptions () {
      return {
        title: `${this.selected_category} Spending over 12 months`,
        categories: this.category_total_names,
        series: [
          { name: 'Expense', data: this.category_total_expense },
          { name: 'Income', data: this.category_total_income }
        ]
      }
    },
    categories () {
      return this.$store.getters.sortedCategories
    }
  },
  watch: {
    selected_category: function () { this.categoryChanged() }
  },
  methods: {
    async getCategoryList () {
      let categoryList = []
      for (let category in this.categories) {
        categoryList.push({ value: this.categories[category].id, text: this.categories[category].name })
      }
      return categoryList
    },
    /* eslint-disable */
    async categoryChanged () {
      let currentStartDate = moment().startOf('month')

      let catTotalIncome = []
      let catTotalExpense = []
      let categoryNames = []
      // loop through months
      for (let i = 0; i < 12; i++) {
        let currentEndDate = moment(currentStartDate).endOf('month')
        let totalAmount = 0
        let monthTransactions = await controllers.transaction.getTransactionsByCategoryInRange(this.selected_category, currentStartDate.format('YYYY-MM-DD'), currentEndDate.format('YYYY-MM-DD'))

        for (let transaction of monthTransactions) {
          totalAmount += parseInt(Math.round(parseFloat((transaction['credit'] || transaction['debit'])) * 100))
        }

        if(totalAmount < 0) {
          catTotalIncome.push(0)
          catTotalExpense.push(Math.abs(totalAmount / 100))
        } else {
          catTotalIncome.push(totalAmount / 100)
          catTotalExpense.push(0)
        }
        categoryNames.push(currentStartDate.format('MMMM YYYY'))
        currentStartDate = moment(currentStartDate).subtract(1, 'months')
      }

      this.category_total_expense = catTotalExpense
      this.category_total_income = catTotalIncome
      this.category_total_names = categoryNames
    }
  },
  async mounted () {
    let defaultCategory = await controllers.categories.getDefaultCategory()
    this.category_options = await this.getCategoryList()
    this.selected_category = defaultCategory.id
  }
}
</script>
