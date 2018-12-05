<template>
  <b-card header-class="card-header-button">
    <template slot="header">
      <div>
        <h3>Monthly Statistics</h3>
        <span>Credit: <span class="mono-font">{{ '$'+monthly_stats.credit }}</span>, Debit: <span class="mono-font">{{ '$'+monthly_stats.debit }}</span></span>
      </div>
      <b-form-group horizontal style="width: 60%">
        <b-form-select v-model="selected_year" :options="year_options" style="width: 35%"/>
        <b-form-select v-model="selected_month" :options="month_options" style="width: 60%"/>
      </b-form-group>
    </template>
    <b-card-body>
      <b-row>
        <b-col md="6">
          <pet-category-spendlist :category_spends="monthly_stats.categoryTotals"/>
        </b-col>
        <b-col md="6">
          <pet-category-monthlychart v-if="monthlyChartData != null && monthlyChartData.length !== 0" :chart-options="monthlyChartOptions"/>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>
<script>
import controllers from '../../data/controllers'
import moment from 'moment'

import CategorySpendList from '../Categories/CategorySpendList.vue'
import PieChart from '../Charts/PieChart.vue'

export default {
  name: 'pet-statistics-monthlyoverview',
  components: {
    'pet-category-spendlist': CategorySpendList,
    'pet-category-monthlychart': PieChart
  },
  data () {
    return {
      selected_month: (new Date()).getMonth() + 1,
      selected_year: (new Date()).getFullYear(),
      year_options: this.getLastHundredYears(),
      monthly_stats: {
        credit: 0,
        debit: 0,
        position: 0,
        categoryTotals: null
      },
      month_options: [
        { value: 1, text: 'January' },
        { value: 2, text: 'February' },
        { value: 3, text: 'March' },
        { value: 4, text: 'April' },
        { value: 5, text: 'May' },
        { value: 6, text: 'June' },
        { value: 7, text: 'July' },
        { value: 8, text: 'August' },
        { value: 9, text: 'September' },
        { value: 10, text: 'October' },
        { value: 11, text: 'November' },
        { value: 12, text: 'December' }
      ]
    }
  },
  computed: {
    categories () {
      return this.$store.state.Categories.categories
    },
    /* eslint-disable */
    monthlyChartData () {
      if(this.monthly_stats.categoryTotals === null) return
      let chartData = []

      // Loop through the category spends
      for (let index in this.monthly_stats.categoryTotals) {
        let currentTotalObject = this.monthly_stats.categoryTotals[index]
        let categoryAmount = currentTotalObject.debit + currentTotalObject.credit
        if(categoryAmount >= 0) continue
        chartData.push({
          name: currentTotalObject.category.name,
          y: (categoryAmount / 100) / (this.monthly_stats.debit)
        })
      }
      return chartData
    },
    monthlyChartOptions () {
      return {
        title: 'Spending by Category',
        seriesName: 'Categories',
        data: this.monthlyChartData
      }
    }
  },
  watch: {
    selected_month: function () { this.statDateChange() },
    selected_year: function () { this.statDateChange() }
  },
  methods: {
    getLastHundredYears () {
      let currentYear = (new Date()).getFullYear()

      let yearOptions = []
      for (let i = currentYear; i >= currentYear - 100; i--) {
        yearOptions.push({ value: i, text: i })
      }
      return yearOptions
    },
    async statDateChange () {
      let startDate = moment([this.selected_year, this.selected_month - 1])
      let endDate = moment(startDate).endOf('month')

      let transactions = await controllers.transaction.getTransactionsInRange(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'))
      let totalCredit = 0
      let totalDebit = 0

      let categoryTotals = {}
      let excludedCategories = []

      // Setup categoryTotals to be empty for each category
      for(let category of this.categories){
        categoryTotals[category.id] = {
          category: await controllers.categories.getCategoryById(category.id),
          debit: 0,
          credit: 0
        }
        if(category.exclude){
          excludedCategories.push(category.id)
        }
      }
      
      transactions.forEach((transaction) => {
        // Dont include if excluded category
        if(excludedCategories.includes(transaction.categoryId)) return

        // Calculate amount and assign to category and global totals
        let amount = parseInt(Math.round(parseFloat((transaction['credit'] || transaction['debit'])) * 100))
        if (amount > 0) {
          totalCredit += amount
          categoryTotals[transaction['categoryId']].credit += amount
        } else {
          totalDebit += amount
          categoryTotals[transaction['categoryId']].debit += amount
        }
      })
      this.monthly_stats.credit = totalCredit / 100
      this.monthly_stats.debit = totalDebit / 100
      this.monthly_stats.position = (totalCredit + totalDebit) / 100
      this.monthly_stats.categoryTotals = categoryTotals
    }
  },
  mounted () {
    this.statDateChange()
  }
}
</script>
